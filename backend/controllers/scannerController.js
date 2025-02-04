// backend/controllers/scannerController.js
const axios = require('axios');

exports.analyzeCode = async (req, res) => {
  const { code, analysisType = "security", model = "text-davinci-003" } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Código não fornecido' });
  }

  let prompt = "";

  switch (analysisType) {
    case "security":
      prompt = `Analise o seguinte código JavaScript em busca de vulnerabilidades de segurança, padrões de backdoors ou práticas inseguras. Identifique pontos críticos e forneça recomendações de correção detalhadas. Código:\n\n${code}`;
      break;
    case "style":
      prompt = `Analise o seguinte código JavaScript e sugira melhorias de estilo e boas práticas para aumentar a legibilidade e a manutenibilidade do código. Código:\n\n${code}`;
      break;
    case "dependencies":
      prompt = `Verifique o seguinte código JavaScript para identificar se ele importa bibliotecas conhecidas por terem vulnerabilidades ou problemas de segurança. Liste as dependências suspeitas e sugira alternativas seguras se aplicável. Código:\n\n${code}`;
      break;
    default:
      prompt = `Analise o seguinte código JavaScript em busca de vulnerabilidades de segurança, padrões de backdoors ou práticas inseguras. Identifique pontos críticos e forneça recomendações de correção detalhadas. Código:\n\n${code}`;
      break;
  }

  try {
    const requestData = {
      model,
      prompt,
      max_tokens: 250,           
      temperature: 0.3,          
      frequency_penalty: 0.2,   
      top_p: 1
    };

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    // API answer to client
    res.json({ analysis: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Erro na análise de código:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao analisar o código.' });
  }
};
