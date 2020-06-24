import React, { useEffect, useState } from 'react';
import { getEntriesFromXHR, getTextFromEntry, parseXml } from './utils';
import './Document.css';

const MANIFEST_FILENAME = 'word/document.xml';

function Archive() {
  const [entries, setEntries] = useState([]);
  const [, setEntryMap] = useState(new Map());
  const [textNodes, setTextNodes] = useState([]);

  useEffect(() => {
    const entryMap = new Map();
    for (let entry of entries) {
      entryMap.set(entry.filename, entry);
    }
    setEntryMap(entryMap);
    const manifestEntry = entries.find((entry) => {
      console.log(entry.filename);
      return entry.filename === MANIFEST_FILENAME;
    });
    // console.log({ manifestEntry });

    async function foo() {
      if (manifestEntry != null) {
        let xml;
        try {
          xml = await getTextFromEntry(manifestEntry);
        } catch (error) {
          // this.setState({ errorLoading: true });
        }
        if (xml != null) {
          const manifest = parseXml(xml);
          const nodes = Array.prototype.slice.call(
            manifest.querySelectorAll('t')
          );

          setTextNodes(nodes);
          // this.loadResources(xml);
        }
      }
    }
    foo();
  }, [entries]);

  useEffect(() => {
    let file = new URLSearchParams(window.location.search).get('file');
    if (file.indexOf('http') === 0) {
      file = `https://cors-anywhere.herokuapp.com/${file}`;
    }
    const [, getEntriesPromise] = getEntriesFromXHR(
      file || '/test-documents/test1.docx'
    );
    getEntriesPromise.then((entries) => {
      setEntries(entries);
    });
  }, []);
  return (
    <div className="Archive">
      <h1>DOCX Viewer</h1>
      <div>
        <em>Dreaming big. Starting small.</em>
        <ul>
          <li>
            <a href="/?file=/test-documents/test1.docx">test1.docx</a>
          </li>
          <li>
            <a href="/?file=https://filesamples.com/samples/document/docx/sample1.docx">
              https://filesamples.com/samples/document/docx/sample1.docx
            </a>
          </li>
          <li>
            <a href="/?file=https://filesamples.com/samples/document/docx/sample2.docx">
              https://filesamples.com/samples/document/docx/sample2.docx
            </a>
          </li>
          <li>
            <a href="/?file=https://filesamples.com/samples/document/docx/sample3.docx">
              https://filesamples.com/samples/document/docx/sample3.docx
            </a>
          </li>
          <li>
            <a href="/?file=https://filesamples.com/samples/document/docx/sample4.docx">
              https://filesamples.com/samples/document/docx/sample4.docx
            </a>
          </li>
        </ul>
      </div>

      <div className="Document">
        {textNodes.map((node) => node.textContent)}
      </div>

      <details>
        <summary>test1.docx reference</summary>
        <img src="https://i.imgur.com/5x1pL1l.png" alt="Reference" />
      </details>

      <details>
        <summary>Archive contents</summary>
        {entries.map((entry) => (
          <div key={entry.filename}>{entry.filename}</div>
        ))}
      </details>
    </div>
  );
}

export default Archive;
