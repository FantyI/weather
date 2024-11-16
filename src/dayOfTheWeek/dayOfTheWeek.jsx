import  s from './index.module.css'
import RenderIcon from '../renderIcon/renderIcon';
const dayOfTheWeek = ({data, day, hours}) => {
  return (
    <div className={s.OtherDays}>

      <div className={`${s.topOtherDays} ${s.M_PLUS_Rounded_1c}`}>

        <div className={s.dayWeek}>
          {day}
        </div>

        <div className={s.dateWeek}> 
          {data.date}
        </div>
 
      </div>

      <div className={s.bottomOtherDays}>

        <div className={s.wrapIconDayWeek}>
          <img src={data.hour[hours].condition.icon}/>
        </div>

        <div className={s.cell}>
          <p className={s.name}>humbity</p>
          <p className={s.meaning}>{data.hour[hours].humidity}</p>
        </div>

        <div className={s.cell}>
          <p className={s.name}>temp</p>
          <p className={s.meaning}>{Math.round(data.hour[hours].temp_c)}</p>
        </div>

        <div className={s.cell}>
          <p className={s.name}>wind</p>
          <p className={s.meaning}>{data.hour[hours].wind_kph}</p>
        </div>

        <div className={s.cell}>
          <p className={s.name}>pressure</p>
          <p className={s.meaning}>{data.hour[hours].pressure_mb}</p>
        </div>

      </div>
      
    </div>
  );
};

export default dayOfTheWeek;
