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
      <div className="Document">
        {textNodes.map((node) => node.textContent)}
      </div>

      {entries.map((entry) => (
        <div key={entry.filename}>{entry.filename}</div>
      ))}
    </div>
  );
}

export default Archive;
