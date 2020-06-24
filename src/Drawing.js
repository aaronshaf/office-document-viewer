import React, { useEffect, useState } from 'react';
import { relationshipsState, entryMapState } from './atoms';
import { useRecoilValue } from 'recoil';
import { getBlobFromEntry, blobToDataUrl } from './utils';

function Drawing({ node }) {
  const [dataUrl, setDataUrl] = useState(null);
  const relationships = useRecoilValue(relationshipsState);
  const entryMap = useRecoilValue(entryMapState);

  useEffect(() => {
    const rId = node.querySelector('blip')?.getAttribute('r:embed');
    const path = relationships[rId]?.getAttribute('Target');
    const entry = entryMap.get(`word/${path}`);
    getBlobFromEntry(entry).then((blob) => {
      blobToDataUrl(blob).then((dataUrl) => {
        setDataUrl(dataUrl);
      });
    });
  }, [node, entryMap, relationships]);

  // getBlobFromEntry

  return <img src={dataUrl} alt="No description" />;
}

export default Drawing;
