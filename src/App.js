import React from "react";
import DisplayCurrency from "./components/DisplayCurrency";
import './App.css'
import logo from './assets/logo.svg'
import icon from './assets/icon.svg'

export default function App() {

  return (
      <div className="App">
          <div className="content">
              <img src={logo} alt="logo"/>
              <h1>Now you can track<br/>
                  all your cryptos here!</h1>
              <h2>Just enter the <br/>
                  cryptocurrency code on the <br/>
                  from the right.
              </h2>
          </div>
          <DisplayCurrency image={icon}/>
      </div>
  );
}