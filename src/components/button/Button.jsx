import React from "react";
import "./Button.scss";

const Button = ({ title }) => {
  return (
    <div className="btn">
      <button className="learn-more">
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">{title}</span>
      </button>
    </div>
  );
};

export default Button;
