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
    const [, getEntriesPromise] = getEntriesFromXHR(
      '/test-documents/test1.docx'
    );
    getEntriesPromise.then((entries) => {
      setEntries(entries);
    });
  }, []);
  return (
    <div className="Archive">
      <h1>DOCX Viewer</h1>
      <div>
        <em>We're just getting started.</em>
      </div>

      <div className="Document">
        {textNodes.map((node) => node.textContent)}
      </div>

      <details>
        <summary>test1.docx reference</summary>
        <img src="https://i.imgur.com/5x1pL1l.png" />
      </details>

      <details>
        <summary>test1.docx contents</summary>
        {entries.map((entry) => (
          <div key={entry.filename}>{entry.filename}</div>
        ))}
      </details>
    </div>
  );
}

export default Archive;
