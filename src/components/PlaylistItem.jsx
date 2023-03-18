import React from "react";

const PlaylistItem = (props) => {
  return (
    <div
      style={{
        padding: `${props.textSize * 0.5}px`,
      }}
      className="playlist-item"
      onClick={() => props.changeSong(props.index)}
    >
      <p
        style={{
          borderBottom: `2px solid ${props.color}`,
          fontSize: `${props.textSize * 0.1}rem`,
        }}
      >
        {props.index + 1}. {props.name}
      </p>{" "}
    </div>
  );
};

export default PlaylistItem;
