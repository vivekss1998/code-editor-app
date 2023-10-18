import React, { useState, useEffect } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import './CodeEditor.css';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [locked, setLocked] = useState(false);
  const clipboard = useClipboard();

  // Load saved code from local storage on component mount
  useEffect(() => {
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  const handleCopyClick = () => {
    if (code) {
      clipboard.copy(code);
      if (clipboard.copied) {
        alert('Code copied to clipboard');
      }
      else {
        alert('Code copied to clipboard');
      }
    }
  };

  const handleSaveClick = () => {
    if (code) {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'code.txt';
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  const handleLockClick = () => {
    setLocked(!locked);
  };

  const handleIncreaseIndent = () => {
    setCode((prevCode) => {
      return prevCode
        .split('\n')
        .map((line) => '  ' + line)
        .join('\n');
    });
  };

  const handleDecreaseIndent = () => {
    setCode((prevCode) => {
      return prevCode
        .split('\n')
        .map((line) => (line.startsWith('  ') ? line.slice(2) : line))
        .join('\n');
    });
  };

  return (
    <div className={`code-editor ${locked ? 'code-editor--locked' : ''}`}>
      <div className="code-editor__buttons">
        <button className="code-editor__button code-editor__button--copy" onClick={handleCopyClick}>
          <i className="fas fa-copy code-editor__icon"></i> Copy
        </button>
        <button className="code-editor__button code-editor__button--save" onClick={handleSaveClick}>
          <i className="fas fa-download code-editor__icon"></i> Save
        </button>
        <button
          className="code-editor__button code-editor__button--lock"
          onClick={handleLockClick}
        >
          <i className={`fas ${locked ? 'fa-unlock' : 'fa-lock'} code-editor__icon`}></i>{' '}
          {locked ? 'Unlock' : 'Lock'}
        </button>
        <button
          className={`code-editor__button code-editor__button--increase-indent`}
          onClick={handleIncreaseIndent}
        >
          <i className="fas fa-indent code-editor__icon"></i> Increase Indent
        </button>
        <button
          className={`code-editor__button code-editor__button--decrease-indent`}
          onClick={handleDecreaseIndent}
        >
          <i className="fas fa-outdent code-editor__icon"></i> Decrease Indent
        </button>
      </div>
      <textarea
        className="code-editor__input"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        readOnly={locked}
      />
    </div>
  );
};

export default CodeEditor;
