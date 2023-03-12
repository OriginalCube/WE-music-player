import React from "react";

const Background = (props) => {
  return (
    <div>
      {props.mode ? (
        <img
          className="background-large"
          src={
            props.node.default
              ? "./assets/images/" + props.node.name + ".jpg"
              : "file:///" + props.node.name
          }
          alt=""
        />
      ) : (
        <img
          className="background-small"
          src={
            props.node.default
              ? "./assets/images/" + props.node.name + ".jpg"
              : "file:///" + props.node.name
          }
          alt=""
        />
      )}
    </div>
  );
};

export default Background;
