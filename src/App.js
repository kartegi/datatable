import React, { useEffect, useState } from 'react';
import './App.css'
import Datatable from './Datatable/Datatable';

const App = () => {

  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const URL = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}'
    fetch(URL)
    .then(resolve => resolve.json())
    .then(json => setData(json))
    .catch(error => setError(error))
  }, [])

  const handleSearch = data => {
    const columns = data[0] && Object.keys(data[0])
    return data.filter(row => 
      columns.some(
        column => row[column].toString().toLowerCase().indexOf(search.toLowerCase()) > -1
      )
    )
  }


  const handleSort = e => {
    if (!sort || sort === 'asc') {
      setData([...data].sort((a, b) => {
        a = typeof a[e.target.innerText] === 'number' ? a[e.target.innerText] : a[e.target.innerText].toLowerCase()
        b = typeof b[e.target.innerText] === 'number' ? b[e.target.innerText] : b[e.target.innerText].toLowerCase() 
        return a > b ? -1 : 1
      }))
      setSort('desc')
    } else if (sort === 'desc') {
      setData([...data].sort((a, b) => {
        a = typeof a[e.target.innerText] === 'number' ? a[e.target.innerText] : a[e.target.innerText].toLowerCase()
        b = typeof b[e.target.innerText] === 'number' ? b[e.target.innerText] : b[e.target.innerText].toLowerCase() 
        return a < b ? -1 : 1
      }))
      setSort('asc')
    }
  }

  return (
    <div className='app container'>
      <input
        type="text"
        className='search'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {
        error ? <h2>Error! Reload the page.</h2> : 
          <Datatable data={handleSearch(data)} handleSort={handleSort}/>
      }
    </div>
  );

};

export default App;