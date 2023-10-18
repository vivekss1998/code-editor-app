import React from 'react';
import CodeEditor from './components/CodeEditor'; // component path
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*CodeEditor component*/}
        <CodeEditor />
      </header>
    </div>
  );
}

export default App;
