import React, { useState, useEffect } from 'react';
import './styles/App.scss';


const bands = [
    {
        id: 1,
        term: 'Nightwish',
        definition: "aaaaaaa",
    },
    {
        id: 2,
        term: 'Bon Jovi',
        definition: "ccccc",
      },
    {
        id: 3,
        term: 'Metallica',
        definition: "bbbbbc",
    },
    {
        id: 4,
        term: 'Abba',
        definition: "zzzz",
    },
  ];
  
  function SortTest() {
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('term');
  
    useEffect(() => {
      const sortArray = type => {
        const types = {
          term: 'term',  
          definition: 'definition',
        };
        const sortProperty = types[type];
        const sorted = [...bands].sort((a, b) => {
          if (sortProperty === 'term') {
            return a.term.localeCompare(b.term);
          } else {
            return a.definition.localeCompare(b.definition);
          }
        });
        setData(sorted);
      };
  
      sortArray(sortType);
    }, [sortType]);
  
    return (
      <div className="App">
        <select onChange={e => setSortType(e.target.value)}>
        <option value="term">Term</option>            
          <option value="definition">Definition</option>
        </select>
        <p onClick={() => setSortType('term')}>Term</p>
        <p onClick={() => setSortType('definition')}>Definition</p>

        {data.map(band => (
          <div key={band.id} style={{ margin: '30px' }}>
            <div>{`Term: ${band.term}`}</div>
            <div>{`Definition: ${band.definition}`}</div>
          </div>
        ))}
      </div>
    );
  }
  
  export default SortTest;