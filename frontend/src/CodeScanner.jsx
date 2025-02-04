// frontend/src/CodeScanner.js
import React, { useState } from 'react';
import axios from 'axios';

const CodeScanner = () => {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnalysis("");
    
    try {
      const response = await axios.post("/api/scanner/analyze", { code });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error(error);
      setAnalysis("Erro ao analisar o código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Detector de Scripts Maliciosos</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="80"
          placeholder="Cole seu código JavaScript aqui..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Analisando..." : "Analisar Código"}
        </button>
      </form>
      {analysis && (
        <div style={{ marginTop: "20px" }}>
          <h3>Resultado da Análise:</h3>
          <pre>{analysis}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeScanner;