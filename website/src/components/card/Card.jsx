import React from "react";
import { Link } from "gatsby";

import "./card.less";

const Card = ({ content, title, link, icon }) => {
  return (
    <Link className="card" to={link}>
      <div className="card__icon">{icon}</div>
      <div className="card__title">{title}</div>
      <div className="card__content">{content}</div>
    </Link>
  );
};

export default Card;
