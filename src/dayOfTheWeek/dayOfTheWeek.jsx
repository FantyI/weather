import './index.css'
import RenderIcon from '../renderIcon/renderIcon';
const dayOfTheWeek = ({data, day, hours}) => {
  return (
    <div className='OtherDays'>

      <div className='topOtherDays M_PLUS_Rounded_1c'>

        <div className='dayWeek'>
          {day}
        </div>

        <div className='dateWeek'> 
          {data.date}
        </div>
 
      </div>

      <div className='bottomOtherDays'>

        <div className='wrapIconDayWeek'>
          <img src={data.hour[hours].condition.icon}/>
        </div>

        <div className='cell'>
          <p className='name'>humbity</p>
          <p className='meaning'>{data.hour[hours].humidity}</p>
        </div>

        <div className='cell'>
          <p className='name'>temp</p>
          <p className='meaning'>{Math.round(data.hour[hours].temp_c)}</p>
        </div>

        <div className='cell'>
          <p className='name'>wind</p>
          <p className='meaning'>{data.hour[hours].wind_kph}</p>
        </div>

        <div className='cell'>
          <p className='name'>pressure</p>
          <p className='meaning'>{data.hour[hours].pressure_mb}</p>
        </div>

      </div>
      
    </div>
  );
};

export default dayOfTheWeek;
