import React, { useState } from 'react'
import axios from 'axios'
import './Home.css'
import DetailsCard from './DetailsCard'

const Home = () => {

    const [query, setQuery] = useState('')
    const [data, setData] = useState([])


    const getData = (event) => {
        event.preventDefault();

        axios.get(`https://assignment-gydv.herokuapp.com/reports?cmdtyID=${query}`)
            .then(response => {
                setData(response.data)
            })
    }

    const Querychangehandler = (event) => {
        setQuery(event.target.value)
    }

    console.log(data)

    return (
        <div className='main' >
            <form onSubmit={getData} >
                <div className='formcontainer'>
                    <input className='input' placeholder='Commodity ID' type='text' onChange={Querychangehandler} />
                    <button className='button' type='submit' >Get Details</button>
                </div>
            </form>
            <div className='cardContainer'>
                {
                    data.map((reportDetails) => (
                        <DetailsCard item={reportDetails} />
                    )
                    )
                }
            </div>
        </div>
    )
}

export default Home
