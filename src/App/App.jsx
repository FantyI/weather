import Weather from "../weather/weather";
import Map from '../map/map'

import './index.css'
import '../commonStyles.css'
import { useState } from "react";



const App = () => {
    const [conditionMap, setConditionMap] = useState(false);
    return (
        <div className="container">
            {conditionMap ? <Map setConditionMap={setConditionMap}/> : <Weather setConditionMap={setConditionMap}/>}
        </div> 
    ); 
}

export default App;