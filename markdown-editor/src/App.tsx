import React from 'react';
import './App.css';
import MarkdownEditor from './components/MarkdownEditor'; // Make sure this path is correct
import ErrorBoundary from './boundaries/errorBoundaries';
import { Slate } from 'slate-react';

function App() {
  return (
    <div className="App">
        <ErrorBoundary>
          <MarkdownEditor />
        </ErrorBoundary>
    </div>
  );
}

export default App;