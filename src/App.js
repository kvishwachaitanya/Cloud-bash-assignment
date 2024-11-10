// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [url, setUrl] = useState('');
//   const [topN, setTopN] = useState(10);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const isValidURL = (str) => {
//     const pattern = new RegExp('^(https?:\\/\\/)?'+
//       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
//       '((\\d{1,3}\\.){3}\\d{1,3}))'+
//       '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
//       '(\\?[;&a-z\\d%_.~+=-]*)?'+
//       '(\\#[-a-z\\d_]*)?$','i');
//     return pattern.test(str);
//   };

//   const fetchFrequentWords = async () => {
//     if (!isValidURL(url)) {
//       setError("Please enter a valid URL.");
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/frequent-words', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ url, n: topN })
//       });
      
//       if (!response.ok) throw new Error('Failed to fetch word frequencies');

//       const data = await response.json();
//       setResults(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <h2>Top Word Frequency Checker</h2>
//       <input 
//         type="text" 
//         placeholder="Enter URL" 
//         value={url} 
//         onChange={(e) => setUrl(e.target.value)} 
//       />
//       <input 
//         type="number" 
//         placeholder="Top N Words" 
//         value={topN} 
//         onChange={(e) => setTopN(parseInt(e.target.value) || 10)} 
//         min="1"
//       />
//       <button onClick={fetchFrequentWords} disabled={loading}>
//         {loading ? "Analyzing..." : "Analyze"}
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {loading ? (
//         <div className="loader"></div>
//       ) : (
//         results.length > 0 && (
//           <table>
//             <thead>
//               <tr>
//                 <th>Word</th>
//                 <th>Frequency</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map(({ word, freq }, index) => (
//                 <tr key={index}>
//                   <td>{word}</td>
//                   <td>{freq}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [topN, setTopN] = useState(10);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(str);
  };

  const fetchFrequentWords = async () => {
    if (!isValidURL(url)) {
      setError("Please enter a valid URL.");
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/frequent-words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, n: topN })
      });
      
      if (!response.ok) throw new Error('Failed to fetch word frequencies');

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>Top Word Frequency Checker</h2>
      <input 
        type="text" 
        placeholder="Enter URL" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Top N Words" 
        value={topN} 
        onChange={(e) => setTopN(parseInt(e.target.value) || 10)} 
        min="1"
      />
      <button onClick={fetchFrequentWords} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <div className="loader"></div>
      ) : (
        results.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ word, freq }, index) => (
                <tr key={index}>
                  <td>{word}</td>
                  <td>{freq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

export default App;
