import React from "react";

const Label = (props) => {
  return (
    <div>
      <label className="mr-1 text-light text-base">{props.title}</label>
    </div>
  );
};

export default Label;
