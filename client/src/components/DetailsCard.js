import React from 'react'
import './DetailsCard.css'

const DetailsCard = (props) => {
    const ind = props.item.users.length - 1
    return (
        <div className='maincontainer' >
            <div className='divContainer'>
                <div className='divItems userName' >{props.item.users[ind]}</div>
                <div className='divItem marketName' >{props.item.marketName}</div>
            </div>
            <div className='detailsContainer' >
                <div>{props.item.cmdtyName}</div>
                <div className='priceContainer' >{'\u20B9'}{props.item.minPrice}-{props.item.maxPrice}/{props.item.priceUnit}</div>
            </div>
        </div>
    )
}

export default DetailsCard
