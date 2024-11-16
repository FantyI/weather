// import { text } from '@fortawesome/fontawesome-svg-core';
// import s from './style.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSun, faCloudRain } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';





const RenderIcon = ({ code }) => {

    const rain = {
        arr: [1237, 1261, 1264, 1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246],
        icon: 'src/iconWeather/sun.png',
        backgroundImg: 'src/backgroundImg/rainDay.png',
    }
    const snow = {
        arr: [1066, 1069, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1258, 1114, 1117],
        icon: 'src/iconWeather/sun.png',
        backgroundImg: 'src/backgroundImg/rainDay.png',
    }
    const sunny = {
        arr: [1000],
        icon: 'src/iconWeather/snowflake-solid (2).svg',
        backgroundImg: 'src/backgroundImg/rainDay.png',
    } 
    const cloudy = {
        arr: [1003, 1006, 1009],
        icon: 'src/iconWeather/sun.png',
        backgroundImg: 'src/backgroundImg/rainDay.png',
    }
    const fog = {
        arr: [1030, 1135, 1147],
        icon: 'src/iconWeather/sun.png',
        backgroundImg: 'src/backgroundImg/rainDay.png',
    }
    const thunderstorm = {
        arr: [1087],
        icon: 'src/iconWeather/sun.png',
        backgroundImg: 'src/backgroundImg/rainDay.png',
    }
    // const snowstorm = { 
    //     arr: [1114, 1117],
    //     icon: 'src/iconWeather/sun.png',
    //     backgroundImg: 'src/backgroundImg/rainDay.png',
    // }
    // const hail = {
    //     arr: [1237, 1261, 1264],
    //     icon: 'src/iconWeather/sun.png',
    //     backgroundImg: 'src/backgroundImg/rainDay.png',
    // }
    // const rainAndSnow = {
    //     arr: [1249, 1252, 1255],
    //     icon: 'src/iconWeather/sun.png',
    //     backgroundImg: 'src/backgroundImg/rainDay.png',
    // }
    const rainAndThunder = {
        arr: [1273, 1276],
        icon: 'src/iconWeather/sun.png',
        backgroundImg: 'src/backgroundImg/rainDay.png',
    }
    // const snowAndThunderstorms = {
    //     arr: [1279, 1282],
    //     icon: 'src/iconWeather/sun.png',
    //     backgroundImg: 'src/backgroundImg/rainDay.png',
    // }
    
    const commonArr = [rain, snow, sunny, cloudy, fog, thunderstorm, rainAndThunder]
    
    const [data, setData] = useState('')
    useEffect(() => {
        icon(code)
    }, [])
    
    const icon = (code) => {
        console.log(code)
        commonArr.forEach((element) => {
            console.log(element.arr)
            if (element.arr.includes(code)) {
                console.log(element.icon)
                setData(element.icon);
                return;
            }
        })
    }

}

export default RenderIcon;