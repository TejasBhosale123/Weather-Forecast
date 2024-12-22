import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import sun from "/sun.png";
import rain from "/rain.png";

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
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const fullDate = `${month} ${day}, ${year}`;
  console.log(fullDate);

  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const hCity = (e) => {
    setCity(e.target.value);
  };

  const API_KEY = "1d01582ce596934182f8fe4457588f06";

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log(data);
    setWeather(data);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeather = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const toggleMode = () => {
    setIsCelsius(!isCelsius);
  };

  const icon = (main) => {
    switch (main) {
      case "Clouds":
        return sun;
      case "Rain":
        return rain;
      
      default:
        return sun;
    }
  };

  return (
    <>
      <div className="App"></div>
      <div className="container">
        {weather && (
          <>
            <h1> Weather App</h1>

            <div className="container-date"> {fullDate} </div>
            <div className="container-city"> {weather.name} </div>
            <div className="container-temp">
              {" "}
              {isCelsius
                ? `${weather.main.temp} °C`
                : `${(weather.main.temp * 9) / 5 + 32} °F`}
            </div>
            <div className="container-msg"> {weather.weather[0].main} </div>
            <br />
            <img
              className="container-image"
              src={icon(weather.weather[0].main)}
              height="140px"
            ></img>
            <form onSubmit={getWeather}>
              <input
                type="text"
                placeholder="City Name"
                onChange={hCity}
                value={city}
              ></input>
              <input type="submit" value="Get Weather"></input>
            </form>
            <br />
            <button onClick={toggleMode}>
              Convert To {isCelsius ? "Far" : "Celsius"}
            </button>
            <br />
          </>
        )}
      </div>
    </>
  );
}

export default App;
