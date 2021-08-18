import React from "react";
import { Link } from "gatsby";

import "./card.less";

const Card = ({ content, title, link, icon }) => {
  const internalLink = link.startsWith("/");
  return internalLink ? (
    <Link className="card" to={link}>
      <div className="card__icon">{icon}</div>
      <div className="card__title">{title}</div>
      <div className="card__content">{content}</div>
    </Link>
  ) : (
    <a className="card" href={link}>
      <div className="card__icon">{icon}</div>
      <div className="card__title">{title}</div>
      <div className="card__content">{content}</div>
    </a>
  );
};

export default Card;
