import React,{useRef, useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import './DisplayCurrency.css'

const DisplayCurrency = (props) => {

    const inputRef = useRef("BTC")
    const [currency,setCurrency]=useState("BTC")
    const [price,setPrice]=useState([])
    const [name,setName]=useState([])

    function handleClick(){
        setCurrency(inputRef.current.value)
        setPrice(storage)
        setName(cryptoName)
    }

    const GET_PRICES = gql`
        query price {
            markets(filter: { marketSymbol:{_eq:"Binance:${currency}/EUR"},baseSymbol: { _eq: "${currency} " }, quoteSymbol: { _eq: "EUR" } }) {
                ticker {
                    lastPrice
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_PRICES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let test = JSON.stringify(Object.values(data.markets.map(({ticker})=>JSON.stringify(ticker)
        .split(/[^.0-9]/))
        .toString()
        .split(/[^.0-9]/)
        .filter(el=>el !== '')))
        .slice(2).split('')
        .reverse()
        .slice(2)
        .reverse()
        .join('')


    let storage = []

    let cryptoList = Object.values(JSON.stringify(price).split(/[^,.0-9]/).filter(el=>el!==''&&el!==','))

    let cryptoName = Object.values(JSON.stringify(name).split(/[^,.0-9]/).filter(el=>el!==''&&el!==','))



    if (handleClick){
        storage.push(cryptoList)
        storage.push(test)
        cryptoName.push(currency)
        cryptoName.push(name)
    }

    console.log(JSON.stringify(cryptoName).split(/[^a-zA-Z]/).filter(el=>el!=='').reverse())

    return data.markets.map(({ticker}) => (
        <div>
            <div className='form-box'>
                <input className='input-curr' type="text" ref={inputRef}/>
                <button className='add-btn' onClick={handleClick}>Add</button>
                <label>Use of this service is subject to terms and<br/> conditions</label>
            </div>
            <br/>
            <div className='list-item'>{JSON.stringify(storage)
                .split(/[^.0-9]/)
                .filter(el=>el!=='')
                .flat()
                .map((el,i)=>(
                <div className='item'>
                    <div className='item-info'>
                        <div className='name'>{JSON.stringify(cryptoName).split(/[^a-zA-Z]/).filter(el=>el!=='').reverse()[i]}</div>
                        <div className='num'>{parseFloat(el)}<label>€</label><hr/></div>
                    </div>
                    <img src={props.image} alt="icon"/>
                </div>))}
            </div>
        </div>
    ));
};

export default DisplayCurrency;
