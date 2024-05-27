import React, { useState, useEffect } from 'react';
import './App.css';

let events = null;
function App() {
  const [ facts, setFacts ] = useState([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      if(events == null){
        events = new EventSource('http://localhost:3001/events');
      }else{ 
        events.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          setFacts((facts) => facts.concat(parsedData));
        };
      }

      setListening(true);
    }
  }, [listening, facts]);

  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Index</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {
          facts.map((fact, i) =>
            <tr key={i}>
              <td>{i}</td>
              <td>{fact.Name}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

export default App;
