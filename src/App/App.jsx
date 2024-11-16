import Weather from "../weather/weather";
import Map from '../map/map'

import s from './index.module.css'
import '../commonStyles.css'
import { useState } from "react";



const App = () => {
    const [conditionMap, setConditionMap] = useState(false);
    return (
        <div className={`${s.container} `}>
            {conditionMap ? <Map setConditionMap={setConditionMap}/> : <Weather setConditionMap={setConditionMap}/>}
        </div> 
    ); 
}

export default App;