import React from "react";

const Background = (props) => {
  return (
    <div>
      {props.mode ? (
        <img
          className="background-large"
          src={
            "./assets/images/" + props.node.name + "." + props.node.imageType
          }
          alt=""
        />
      ) : (
        <img
          className="background-small"
          src={
            "./assets/images/" + props.node.name + "." + props.node.imageType
          }
          alt=""
        />
      )}
    </div>
  );
};

export default Background;
