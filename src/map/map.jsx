import './index.css';
import '../commonStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTrash, faHome } from '@fortawesome/free-solid-svg-icons'
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { useState, useEffect } from 'react';
import { APIkey } from '../APIkey'

import { trackedCities } from '../APIkey';
import { backgroundImg } from '../APIkey';
// import RenderListCities from '../renderListCities/renderListCities';

const Map = ({setConditionMap}) => {
    const [activeAdd, setActiveAdd] = useState(false);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [background, setBackground] = useState('');
    const keyListCity = 'LIST_CITY';
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false)
    let temporaryData = [];
    useEffect(() => {
        setBackground(JSON.parse(localStorage.getItem(backgroundImg)));
        setCities(JSON.parse(localStorage.getItem(keyListCity)) || []);
        requestTOTheServer();
    }, [])

    useEffect(() => {
        console.log(cities)

        if (cities.length === 0) {
            setData(); 
            return;
        }
        requestTOTheServer()
    }, [cities])




    const handlerClickAdd = () => {
        setActiveAdd(true);
    }

    const handlerChange = (event) => {
        setCity(event.target.value);
    }

    const hendlerEnter = (event) => {
        if (event.code === 'Enter') {
            handlerClickSearch();
        }
    }

    const handlerClickCity = (thisCity) => {
        console.log('handlerClickCity : ', thisCity)
        console.log(thisCity)
        localStorage.setItem(trackedCities, thisCity);
    }

    const delateCity = (city) => {

        const thisCity = localStorage.getItem(trackedCities);
        if (thisCity === city) {
            localStorage.setItem(trackedCities, '')
        }

        // console.log(data, city)
        // const newData = data.filter((item) => item.city !== city);
        // // localStorage.setItem(keyLocalStorege, JSON.stringify(newData));
        // setData(newData);

        const thisCities = JSON.parse(localStorage.getItem(keyListCity));
        const newCities = thisCities.filter((item) => item !== city);
        localStorage.setItem(keyListCity, JSON.stringify(newCities));
        setCities(newCities);
        console.log(cities.length)
    }

    const handlerClickSearch = async () => {
        try {
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${APIkey}%20&q=${city}&days=7&aqi=yes&alerts=yes`;
            setCity('');

            const request = await fetch(url);
            const results = await request.json();

            if (results.error) {
                alert(`Не найден город: ${city}`);
                return;
            }

            const listCity = JSON.parse(localStorage.getItem(keyListCity)) || [];

            if (listCity.includes(results.location.name)) {
                alert('Данный город уже добавлен');
                return;
            }
            localStorage.setItem(keyListCity, JSON.stringify([...listCity, results.location.name]));
            setCities([...listCity, results.location.name]);

            // const pastData = JSON.parse(localStorage.getItem(keyLocalStorege)) || [];
            // localStorage.setItem(keyLocalStorege, JSON.stringify([...pastData, {
            //     city: results.location.name,
            //     temp: results.current.temp_c,
            //     index: pastData.length,
            // }]));
            // console.log(data)
            // setData(JSON.parse(localStorage.getItem(keyLocalStorege) || '[]'));
        }
        catch {
            alert(`Ошибка в работе сервера`);
        }

    }

    const requestTOTheServer = () => {
        cities && cities.forEach(async (city) => {
            try {
                setLoading(true);
                const url = `https://api.weatherapi.com/v1/forecast.json?key=${APIkey}%20&q=${city}&days=7&aqi=yes&alerts=yes`;
                const request = await fetch(url);
                const result = await request.json();
                console.log(result)
                temporaryData = [
                    ...temporaryData,
                    {
                        temp: result.current.temp_c,
                        icon: result.current.condition.icon,
                        name: result.location.name,
                    }
                ]

                console.log(city);
                setData(temporaryData);
            }
            catch {
                console.log('Ошика с сервером')
            }
            finally {
                setLoading(false);
            }

        })
    }

    return (
        <div className={`container ${background[0]} ${background[1]}`}>
            {loading && <div className={`loading`}>loading...</div>}
            <header className={`header`}>
                {/* <Link to="/"><FontAwesomeIcon className={s.back} icon={faHome} /></Link> */}
                <FontAwesomeIcon onClick={() => setConditionMap(false)} className={`back`} icon={faHome} />
                <p className={`city`}>Города</p>
            </header>

            <div onClick={handlerClickAdd} className={`wrapAdd ${activeAdd && 'on'}`}>
                <div className={`decor`}>
                    <div className={`decorOne`}></div>
                    <div className={`decorTwo`}></div>
                </div>
                <div className={`add`}>
                    <input
                        onChange={handlerChange}
                        onKeyDown={hendlerEnter}
                        type="text"
                        className={`input`}
                        value={city}
                    />
                    <FontAwesomeIcon
                        onClick={handlerClickSearch}
                        icon={faMagnifyingGlass}
                        className={`search`}
                    />
                </div>

            </div>

            <main>

                {data ? data.map((data) => (
                    <div key={data.name} className={`wrapCities`} >
                        <Link to='/' className={`theAddedCity`}>
                            <img className={`icon`} src={data.icon} alt="" />
                            <div onClick={() => handlerClickCity(data.name)} className={`city`}>{data.name}</div>

                            <div className={`temp`}>
                                <span>{Math.round(data.temp)}</span>
                                <sup className={`degree`}>o</sup>
                                <div className={`celsius`}>C</div>
                            </div>

                        </Link>

                        <Link to='/Map'>
                            <FontAwesomeIcon className={`delete`} icon={faTrash} onClick={() => delateCity(data.name)} />
                        </Link>
                    </div>
                ))
                    : null}
            </main>
            <div className={`dd`}></div>
        </div>
    );
};

export default Map;