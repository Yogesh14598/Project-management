import React from "react";

function Card(props) {
  return (
    <div className="card_block card_block_billing">
      <div>
        <img className="card__item_img" alt="Image" src={props.src} />
      </div>
      <div>
        <h5>{props.val}</h5>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
}

export default Card;
