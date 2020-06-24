import React, { useEffect, useState } from 'react';
import { getEntriesFromXHR, getTextFromEntry, parseXml } from './utils';
import OpenOfficeNode from './OpenOfficeNode';
import { relationshipsState } from './atoms';
import { useRecoilState } from 'recoil';
import './Document.css';

const DOCUMENT_FILENAME = 'word/document.xml';
const RELATIONSHIPS_FILENAME = 'word/_rels/document.xml.rels';

function Archive() {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [, setEntryMap] = useState(new Map());
  const [nodes, setTextNodes] = useState([]);
  const [, setRelationships] = useRecoilState(relationshipsState);

  useEffect(() => {
    const entryMap = new Map();
    for (let entry of entries) {
      entryMap.set(entry.filename, entry);
    }
    setEntryMap(entryMap);

    const relationshipsEntry = entries.find(
      (entry) => entry.filename === RELATIONSHIPS_FILENAME
    );

    const manifestEntry = entries.find((entry) => {
      return entry.filename === DOCUMENT_FILENAME;
    });

    async function doAsyncStuff() {
      if (relationshipsEntry != null) {
        let r_xml;
        try {
          r_xml = await getTextFromEntry(relationshipsEntry);
        } catch (error) {
          // this.setState({ errorLoading: true });
        }

        if (r_xml != null) {
          const r_doc = parseXml(r_xml);
          const r = Array.from(r_doc.querySelectorAll('Relationship'));
          setRelationships(
            r.reduce((map, current) => {
              return {
                ...map,
                [current.getAttribute('Id')]: current,
              };
            }, {})
          );
        }
      }

      if (manifestEntry != null) {
        let xml;
        try {
          xml = await getTextFromEntry(manifestEntry);
        } catch (error) {
          // this.setState({ errorLoading: true });
        }
        if (xml != null) {
          const doc = parseXml(xml);
          const childNodes = Array.from(doc.querySelector('body').childNodes);

          let nodes = [];
          for (let childNode of childNodes) {
            nodes.push(<OpenOfficeNode key={nodes.length} node={childNode} />);
          }

          setTextNodes(nodes);
        }
      }
    }
    doAsyncStuff();
  }, [entries, setRelationships]);

  useEffect(() => {
    let file = new URLSearchParams(window.location.search).get('file') || '';
    if (file.indexOf('http') === 0) {
      file = `https://cors-anywhere.herokuapp.com/${file}`;
    }
    const [, getEntriesPromise] = getEntriesFromXHR(
      file || '/test-documents/test1.docx'
    );
    if (getEntriesPromise instanceof Promise) {
      getEntriesPromise.then((entries) => {
        setIsLoading(false);
        setEntries(entries);
      });
    }
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

      <div className="Document">{nodes}</div>

      {isLoading === false && (
        <details>
          <summary>Archive contents</summary>
          {entries.map((entry) => (
            <div key={entry.filename}>{entry.filename}</div>
          ))}
        </details>
      )}
    </div>
  );
}

export default Archive;
