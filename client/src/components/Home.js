import React, { useState } from 'react'
import axios from 'axios'
import './Home.css'

const Home = () => {

    const [query, setQuery] = useState('')
    const [data, setData] = useState([])


    const getData = (event) => {
        event.preventDefault();

        axios.get(`http://127.0.0.1:4000/app/reports?cmdtyID=${query}`)
            .then(response => {
                setData(response.data)})
    }

    const Querychangehandler = (event) => {
        setQuery(event.target.value)
    }

    console.log(data);

    return (
        <div className='main' >
            <div className='formcontainer'>
                <form onSubmit={getData} >
                    <input className='input' placeholder='Commodity ID' type='text' onChange={Querychangehandler} />
                    <button className='button' type='submit' >Get Details</button>
                </form>
            </div>
        </div>
    )
}

export default Home
