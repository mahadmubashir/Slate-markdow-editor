import React from 'react';
import './App.css';
import MarkdownEditor from './components/MarkdownEditor'; // Make sure this path is correct

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Markdown Editor App</h1>
      </header>
      <main>
        {/* Render the MarkdownEditor component */}
        <MarkdownEditor />
      </main>
    </div>
  );
}

export default App;