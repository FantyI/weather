// import { APIkey } from "../APIkey";

// const RenderListCities = async({ city }) => {
//     console.log(city, 'dffd')
//     try {
//         const url = `https://api.weatherapi.com/v1/forecast.json?key=${APIkey}%20&q=${city}&days=7&aqi=yes&alerts=yes`;

//         const request = await fetch(url);
//         const results = await request.json();
//         console.log(results);

//         return (
//             <div key={city} className={s.wrapCities} >
//                 <Link to='/' className={s.theAddedCity}>
//                     <div onClick={() => handlerClickCity(city)} className={s.city}>{data.city}</div>

//                     {/* <div className={s.temp}>
//                                     <span>{Math.round(data.temp)}</span>
//                                     <sup className={s.degree}>o</sup>
//                                     <div className={s.celsius}>C</div>
//                                 </div> */}

//                 </Link>

//                 <Link to='/Map'>
//                     <FontAwesomeIcon className={s.delete} icon={faTrash} onClick={() => delateCity(data.city)} />
//                 </Link>
//             </div>
//         ) 
//     } 
//     catch {
//         alert(`Ошибка в работе сервера`);
//     }
// }

// export default RenderListCities;