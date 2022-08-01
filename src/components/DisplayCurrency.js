import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {useRef, useState} from "react";


const DisplayLocations = (props) => {
    const inputRef = useRef("BTC")
    const [currency,setCurrency]=useState("BTC")

    function handleClick(){
        setCurrency(inputRef.current.value)
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

    return data.markets.map(({ticker}) => (
        <div>
            <input type="text" ref={inputRef}/>
            <button onClick={handleClick}>add currency</button>
            <h1>{currency}</h1>
            <h3>{JSON.stringify(ticker)}</h3>
        </div>
    ));
};

export default DisplayLocations;
