import React, { useEffect, useState } from 'react';
import './datatable.css'

const Datatable = ({data, handleSort}) => {
    const [page, setPage] = useState([0, 20])

    useEffect(() => {
        if (page[0] > data.length)
            setPage([0, 20])
    }, [data])

    const handlePageChange = e => {
        if (e.target.innerText === '<' && page[0] > 0){
            setPage([page[0]-20, page[1]-20])
        }
        else if (e.target.innerText === '>' && page[1] < data.length){
            setPage([page[0]+20, page[1]+20])
        }
    }
    
    const columns = data[0] && Object.keys(data[0])
    return (
        <>
            <div className="tablewrapper">
                <table>
                    <thead>
                        <tr>
                            {
                                data[0] ? columns.map((column, i) => (
                                    <th key={i} onClick={handleSort}>
                                        {column}
                                    </th>
                                )) : <th style={{ border: 'none', }}>Loading data...</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(page[0], page[1]).map((row, i) => (
                            <tr key={i}>
                                {columns.map((column, i) => <td key={i}>{row[column]}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                data[0] ? 
                <div className="paggination">
                    <div onClick={handlePageChange} className="arrow">{'<'}</div>
                    <div onClick={handlePageChange} className="arrow">{'>'}</div>
                </div> :
                null
            }
        </>
    );
};

export default Datatable;