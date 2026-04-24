import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const sampleInput = JSON.stringify({ data: ["A->B", "A->C", "B->D", "D->E", "F->G"] }, null, 2);

  const handleExampleClick = () => {
    setInput(sampleInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const parsed = JSON.parse(input);
      
      const API_URL = process.env.REACT_APP_API_URL || 'https://bfhl-backend-api-cr9z.onrender.com';
      const response = await fetch(`${API_URL}/bfhl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTree = (tree, indent = 0) => {
    if (!tree || Object.keys(tree).length === 0) {
      return null;
    }

    return (
      <div className="tree-container" style={{ marginLeft: `${indent * 20}px` }}>
        {Object.entries(tree).map(([key, children]) => (
          <div key={key} className="tree-node">
            <span className="tree-label">{key}</span>
            {renderTree(children, indent + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="title">BFHL API</h1>
          <p className="subtitle">SRM Full Stack Engineering Challenge</p>
        </header>

        <main className="main">
          <div className="input-section">
            <div className="input-header">
              <h2>Input Data</h2>
              <button 
                className="example-btn" 
                onClick={handleExampleClick}
                type="button"
              >
                Load Example
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                className="textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"data": ["A->B", "A->C", "B->D"]}'
                rows={6}
              />
              <button 
                className="submit-btn" 
                type="submit" 
                disabled={loading || !input.trim()}
              >
                {loading ? (
                  <span className="loading">
                    <span className="spinner"></span>
                    Processing...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>

          {error && (
            <div className="error-card">
              <h3 className="error-title">Error</h3>
              <p className="error-message">{error}</p>
            </div>
          )}

          {result && (
            <div className="result-section">
              <div className="result-header">
                <h2>Result</h2>
                <button 
                  className="copy-btn" 
                  onClick={handleCopyJson}
                  type="button"
                >
                  {copied ? 'Copied!' : 'Copy JSON'}
                </button>
              </div>

              <div className="cards-grid">
                {/* User Info Card */}
                <div className="card">
                  <h3 className="card-title">User Information</h3>
                  <div className="card-content">
                    <p><strong>User ID:</strong> {result.user_id}</p>
                    <p><strong>Email:</strong> {result.email_id}</p>
                    <p><strong>Roll Number:</strong> {result.college_roll_number}</p>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="card">
                  <h3 className="card-title">Summary</h3>
                  <div className="card-content">
                    <p><strong>Total Trees:</strong> {result.summary.total_trees}</p>
                    <p><strong>Total Cycles:</strong> {result.summary.total_cycles}</p>
                    <p><strong>Largest Tree Root:</strong> {result.summary.largest_tree_root || 'N/A'}</p>
                  </div>
                </div>

                {/* Invalid Entries Card */}
                {result.invalid_entries.length > 0 && (
                  <div className="card">
                    <h3 className="card-title">Invalid Entries</h3>
                    <div className="card-content">
                      <ul className="list">
                        {result.invalid_entries.map((entry, idx) => (
                          <li key={idx} className="list-item invalid">{entry}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Duplicate Edges Card */}
                {result.duplicate_edges.length > 0 && (
                  <div className="card">
                    <h3 className="card-title">Duplicate Edges</h3>
                    <div className="card-content">
                      <ul className="list">
                        {result.duplicate_edges.map((edge, idx) => (
                          <li key={idx} className="list-item duplicate">{edge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Hierarchies Section */}
              <div className="hierarchies-section">
                <h3 className="section-title">Hierarchies</h3>
                <div className="hierarchies-grid">
                  {result.hierarchies.map((hierarchy, idx) => (
                    <div key={idx} className="hierarchy-card">
                      <div className="hierarchy-header">
                        <h4>Root: {hierarchy.root}</h4>
                        {hierarchy.has_cycle ? (
                          <span className="badge cycle">Cycle</span>
                        ) : (
                          <span className="badge valid">Depth: {hierarchy.depth}</span>
                        )}
                      </div>
                      <div className="hierarchy-content">
                        {hierarchy.has_cycle ? (
                          <p className="cycle-text">Cycle detected - no tree structure</p>
                        ) : (
                          <div className="tree-display">
                            <div className="tree-root">{hierarchy.root}</div>
                            {renderTree(hierarchy.tree)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="footer">
          <p>Built with React, Express & Node.js</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
