import React, { useEffect, useState } from 'react';
import {
  getEntriesFromBlob,
  getEntriesFromXHR,
  getTextFromEntry,
  parseXml,
} from './utils';
import OpenOfficeNode from './OpenOfficeNode';
import { relationshipsState, entryMapState, stylesState } from './atoms';
import { useRecoilState } from 'recoil';
import { Spinner } from '@instructure/ui-spinner';
import './Archive.css';
import './Document.css';

const DOCUMENT_FILENAME = 'word/document.xml';
// const STYLES_FILENAME = 'word/styles.xml';
const RELATIONSHIPS_FILENAME = 'word/_rels/document.xml.rels';

function Archive({ file = null, droppedFile = null }) {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [, setEntryMap] = useRecoilState(entryMapState);
  const [nodes, setTextNodes] = useState([]);
  const [, setRelationships] = useRecoilState(relationshipsState);
  const [, setStylesState] = useRecoilState(stylesState);

  useEffect(() => {
    const entryMap = new Map();
    for (let entry of entries) {
      entryMap.set(entry.filename, entry);
    }
    setEntryMap(entryMap);

    const relationshipsEntry = entries.find(
      (entry) => entry.filename === RELATIONSHIPS_FILENAME
    );

    // const stylesEntry = entries.find(
    //   (entry) => entry.filename === STYLES_FILENAME
    // );

    const manifestEntry = entries.find((entry) => {
      return entry.filename === DOCUMENT_FILENAME;
    });

    async function doAsyncStuff() {
      // if (stylesEntry) {
      //   let stylesXml;
      //   try {
      //     stylesXml = await getTextFromEntry(stylesEntry);
      //   } catch (error) {
      //     // this.setState({ errorLoading: true });
      //   }
      // }

      if (relationshipsEntry != null) {
        let r_xml;
        try {
          r_xml = await getTextFromEntry(relationshipsEntry);
        } catch (error) {
          // this.setState({ errorLoading: true });
        }
        setStylesState(r_xml);

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
  }, [entries, setRelationships, setEntryMap, setStylesState]);

  useEffect(() => {
    if (droppedFile) {
      getEntriesFromBlob(droppedFile).then((entries) => {
        setIsLoading(false);
        setEntries(entries);
      });
    } else if (file) {
      const normalizedFile =
        file?.indexOf('http') === 0
          ? `https://cors-anywhere.herokuapp.com/${file}`
          : '';

      const [, getEntriesPromise] = getEntriesFromXHR(
        normalizedFile || '/test-documents/test1.docx'
      );
      if (getEntriesPromise instanceof Promise) {
        getEntriesPromise.then((entries) => {
          setIsLoading(false);
          setEntries(entries);
        });
      }
    }
  }, [file, droppedFile]);

  return (
    <div className="Archive">
      {isLoading && (
        <div className="delayed-appearance loading">
          <Spinner renderTitle="Loading" size="x-small" variant="inverse" />
        </div>
      )}
      {isLoading === false && nodes.length > 0 && (
        <div className="Document">{nodes}</div>
      )}
    </div>
  );
}

export default Archive;
