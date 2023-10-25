// import React, { useState } from 'react';
// import axios from 'axios';

// const GrammarChecker = () => {
//   const [text, setText] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [apiKey] = useState('AhfGVqeASKPyAOpd'); // Replace with your TextGears API key
//   const [loading, setLoading] = useState(false);

//   const checkGrammar = async () => {
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `https://api.textgears.com/check.php?text=${text}&key=${apiKey}`
//       );

//       console.log('API Response:', response.data); 

//       if (response.data.result) {
//         setSuggestions(response.data.result.errors);
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error('Error checking grammar:', error);
//       setSuggestions([]); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <textarea
//         rows="10"
//         cols="100"
//         placeholder="Enter text here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <br></br>
//       <button onClick={checkGrammar} disabled={loading}>
//         {loading ? 'Checking...' : 'Check Grammar'}
//       </button>
//       {suggestions && Array.isArray(suggestions) && suggestions.length > 0 ? (
//         <ul>
//           {suggestions.map((error, index) => (
//             <li key={index}>{error.better}</li>
//           ))}
//         </ul>
//       ) : null}
//     </div>
//   );
// };

// export default GrammarChecker;



import React, { useState } from 'react';
import axios from 'axios';

const GrammarChecker = () => {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [apiKey] = useState('AhfGVqeASKPyAOpd'); // Replace with your TextGears API key
  const [loading, setLoading] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]); // To capture console-like output

  const logToConsoleAndScreen = (message) => {
    console.log(message); // Log to the console
    setConsoleOutput((prevOutput) => [...prevOutput, message]); // Update the screen
  };

  const checkGrammar = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.textgears.com/check.php?text=${text}&key=${apiKey}`
      );

      logToConsoleAndScreen('API Response: ' + JSON.stringify(response.data)); // Log to console and screen

      if (response.data.result) {
        setSuggestions(response.data.result.errors);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      logToConsoleAndScreen('Error checking grammar: ' + error); // Log to console and screen
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <textarea
          rows="10"
          cols="100"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button onClick={checkGrammar} disabled={loading}>
          {loading ? 'Checking...' : 'Check Grammar'}
        </button>
      </div>
      <div>
        {suggestions && Array.isArray(suggestions) && suggestions.length > 0 ? (
          <ul>
            {suggestions.map((error, index) => (
              <li key={index}>{error.better}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div>
        <h2>Console Output:</h2>
        <ul>
          {consoleOutput.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GrammarChecker;




