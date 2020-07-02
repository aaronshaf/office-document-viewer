import React, { useState } from 'react';

const Dashboard = React.lazy(() => import('./Dashboard.js'));
const Archive = React.lazy(() => import('./Document.js'));

function App() {
  const fileSrc = new URLSearchParams(window.location.search).get('file') || '';
  const [droppedFile, setDroppedFile] = useState(null);

  if (droppedFile) {
    return <Archive droppedFile={droppedFile} />;
  } else if (fileSrc) {
    return <Archive file={fileSrc} />;
  } else {
    return <Dashboard setDroppedFile={setDroppedFile} />;
  }
}

export default App;
