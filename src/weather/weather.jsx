import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import DayOfTheWeek from '../dayOfTheWeek/dayOfTheWeek'
import { APIkey, trackedCities, backgroundImg } from '../APIkey'
import { commonArr } from '../dataWeatherBackground'
import './index.css'
import '../commonStyles.css'

const Weather = ({setConditionMap}) => {

  useEffect(() => {
    requestCerver();
  }, []);

  const [data, setData] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const hours = 12;

  const [backgroundIsDay, setBackgroundIsDay] = useState('');
  const [backgroundName, setBackgroundName] = useState('');

  const [loading, setLoading] = useState(false)

  const [city, setCity] = useState(
    localStorage.getItem(trackedCities) ||
    'Москва');

  const renderBackgroundImg = (code) => {
    console.log(code);

    commonArr.forEach((element) => {
      if (element.arr.includes(code)) {
        setBackgroundName(element.name);
      }
    })
  }

  useEffect(() => {
    sendingData()
  }, [backgroundName, backgroundIsDay]);

  const sendingData = () => {
    localStorage.setItem(backgroundImg, JSON.stringify([backgroundName, backgroundIsDay]) || '[]')
  }
 
  const geolacation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      requestCerver(`${latitude} ${longitude}`);
    });
  } 

  const Change = event => {
    setCity(event.target.value);
  }

  const keyUp = (event) => {
    if (event.code === 'Enter') {
      requestCerver();
    }
  }

  // const handlerClickSearch = () => {
  //   requestCerver();
  // }

  const requestCerver = async (geoLocate) => {
    setLoading(true);
    try {
      console.log(geoLocate , city)
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${APIkey}%20&q=${ geoLocate || city}&days=7&aqi=yes&alerts=yes`;
      console.log(url)
      setCity('');
      
      const request = await fetch(url);
      const value = await request.json();

      if (value.error) {
        alert(`Не найден город: ${city}`);
        return;
      }

      localStorage.setItem(trackedCities, geoLocate || value.location.name)
      setData(value);
      setBackgroundIsDay(value.current.is_day ? 'day' : 'night')
      renderBackgroundImg(value.current.condition.code)


      const DATE = new Date();
      setTime(DATE.getHours())
      setDay(DATE.getDay());
    }
    catch {
      alert(`Ошибка в работе сервера`);
    }
    finally{
      setLoading(false);
    }
  }

  const dayWeek = (value) => {
    if (value > 6) {
      value -= 6;
    }
    switch (value) {
      case 1:
        return 'ПН';
      case 2:
        return 'ВТ';
      case 3:
        return 'СР';
      case 4:
        return 'ЧТ';
      case 5:
        return 'ПТ';
      case 6:
        return 'СБ';
      case 0:
        return 'ВС';
    }
  }

  return (
    <div className={`container ${backgroundName} ${backgroundIsDay}`}>
      {loading && <div className={`loading`}>loading...</div>}
      <div className={`darkening`}>

        <header>

          <div className={`left`}>

            <div className={`day M_PLUS_Rounded_1c`}>
              {console.log(time)}
              {dayWeek(day)}
            </div>

            <div className={`data RobotoFonts`}>
              {data && data.forecast.forecastday[0].date}
            </div>

          </div>

          <div className={`right`}>
            {/* <div className={s.map}>
            </div> */}
            <FontAwesomeIcon icon={faLocationDot} className={`location`} onClick={geolacation} />
            <FontAwesomeIcon onClick={() => setConditionMap(true)} icon={faMapLocationDot} className={`iconMap`} />
            {/* <Link to="/Map"><FontAwesomeIcon icon={faMapLocationDot} className={s.iconMap} /></Link> */}
          </div>

        </header>

        <main className={`main`}>
          <p className={`city M_PLUS_Rounded_1c`}>
            {data && data.location.name}
          </p>

          <div className={`allTemp JuaFonts`}>

            {/* <div className="differenceTemp ">

                <div className="minTemp">min</div>

                <div className="cellTemp">
                  <span>{data && Math.round(data.current.temp_c)}</span>
                  <sup className='degree'>o</sup>
                  <div className='celsius'>C</div>
                </div>

              </div> */}

            <div className={`temp`}>
              <span>{data && Math.round(data.current.temp_c)}</span>
              <sup className={`degree`}>o</sup>
              <div className={`celsius`}>C</div>
            </div>

            {/* <div className="differenceTemp ">

                <div className="minTemp">max</div>

                <div className="cellTemp">
                  <span>{data && Math.round(data.current.temp_c)}</span>
                  <sup className='degree'>o</sup>
                  <div className='celsius'>C</div>
                </div>

              </div> */}

          </div>

          <img className={`icon`} src={data && data.current.condition.icon} alt="" />

          <div className={`search`}>
            <input
              value={city}
              onChange={Change}
              type="text"
              placeholder='Search...'
              onKeyUp={keyUp}
            />
            <FontAwesomeIcon onClick={() => (requestCerver())} className={`iconSearch`} icon={faMagnifyingGlass} />
          </div>

          <div className={`parameters`}>

            <div className={`pressure rectangle RobotoFonts`}>
              <p>pressure</p>
              <p>{data && data.current.pressure_mb}</p>
            </div>

            <div className={`wind rectangle RobotoFonts`}>
              <p>wind</p>
              <p>{data && data.current.windchill_c}км/ч</p>
            </div>

            <div className={`humidit rectangle RobotoFonts`}>
              <p>humidity</p>
              <p>{data && data.current.humidity}%</p>
            </div>

          </div>

          <div className={`days`}>
            {data && <DayOfTheWeek data={data.forecast.forecastday[1]} day={dayWeek(day + 1)} hours={hours} />}
            {data && <DayOfTheWeek data={data.forecast.forecastday[2]} day={dayWeek(day + 2)} hours={hours} />}
          </div>
        </main>

      </div>


    </div>
  )
}

export default Weather;