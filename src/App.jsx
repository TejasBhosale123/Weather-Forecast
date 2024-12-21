import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { use } from "react";

function App() {

  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear()
  const fullDate = `${month} ${day}, ${year}`;
  console.log(fullDate);

  const[city,setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [msg,setMsg] = useState("Wind");
  const hCity = (e) =>{
    setCity(e.target.value);
  }

  const API_KEY = '1d01582ce596934182f8fe4457588f06'

 const fetchWeather = async () => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  console.log(data);
  setWeather(data);

 }

 useEffect(() => {
  fetchWeather();
 }, []);  

 const getWeather = (e) => {  
  e.preventDefault();
  fetchWeather();
  if(weather.main.temp < 25){
    setMsg("It is Normal");
  }
  else if(weather.weather[0].main.toLowerCase() === "rain"){
    setMsg("Its rainy Outside Use Umbrella")
  }
  else if(weather.main.temp > 25){
    setMsg("It is Hot, Apply the sunscreen");
  }
  else{
    setMsg("Enjoy ur day");
  }
  }
 

 
  return (
    <>
      <div className="App"></div>
        <div className="container">
          {weather && (
            <>
            <div className="container-date"> {fullDate} </div>
            <div className="container-city"> {weather.name} </div>
            <div className="container-temp"> {weather.main.temp}</div>
            <div className="container-msg"> {weather.weather[0].main} </div>
            <br/>
            <br/>
            <form onSubmit={getWeather}>
            <input type="text" placeholder="City Name" onChange={hCity} value={city}></input>
            <input type="submit" value='Get Weather'></input>
            </form>
            <br/>
            <h2>{msg}</h2>

            </>
        
          )}
        </div>
    </>
  );
}

export default App;
