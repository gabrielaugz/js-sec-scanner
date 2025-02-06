// frontend/src/CodeScanner.js
import React, { useState } from 'react';
import axios from 'axios';

const CodeScanner = () => {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  // upload function
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "applications/javascript" || file.name.endsWith(".js")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Por favor, selecione um arquivo válido (.js - JavaScript).");
    }
  };

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

      {/** upload form file */}
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="file-upload">Upload do arquivo .js</label>
        <input
          id="file-upload"
          type="file"
          accept=".js"
          onChange={handleFileUpload}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="80"
          placeholder="Cole seu código JavaScript aqui ou carregue um arquivo .js"
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