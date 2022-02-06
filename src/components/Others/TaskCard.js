import React from "react";

function Card(props) {
  return (
    <div className="task_block card_block_billing">
      <div>
        <img className="task__item_img" alt="Image" src={props.src} />
      </div>
      <div>
        <h5>{props.val}</h5>
        <p className="task-text">{props.text}</p>
      </div>
    </div>
  );
}

export default Card;
