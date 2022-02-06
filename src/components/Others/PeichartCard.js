import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

const PeichartCard = (props) => { 
  
    return (
        <div>
              <div className="task_block card_block_billing">
      <div style={{width:'100px' , margin:'auto', color:'#F23801' }}>
    

<CircularProgressbar value={props.val} maxValue={1} text={`${props.val * 100}%`}  
  styles={buildStyles({
    pathColor: '#F23801',
    textColor: '#000',
    trailColor: '#fff',
    backgroundColor: '#fff',
  })} 
/>
      </div>
      <div>
        <p className="task-text">{props.text}</p>
      </div>
    </div>
            
        </div>
    )
}

export default PeichartCard
