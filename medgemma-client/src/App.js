import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: image,
          question: 'What is the diagnosis?',
        }),
      });

      const data = await response.json();
      setResult(data.output || data.error || 'No response from model');
    } catch (err) {
      setResult('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Med-Gemma CAP Report Autofill</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <div style={{ marginTop: 20 }}>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}

      <button
        onClick={runAnalysis}
        disabled={!image || loading}
        style={{
          marginTop: 20,
          padding: 10,
          background: '#4f46e5',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Running...' : 'Generate Report'}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>AI Output:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
