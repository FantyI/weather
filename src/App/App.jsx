import Weather from "../weather/weather";
import Map from '../map/map'

import s from './index.module.css'
import '../commonStyles.css'

import { Routes, Route, Outlet, Link } from "react-router-dom";

const App = () => {

    return (
        <div className={`${s.container} `}>
            <Routes>
                <Route path="/" element={<Weather />} />
                <Route path="/Map" element={<Map />} />
            </Routes>
        </div> 
    );
}

export default App;