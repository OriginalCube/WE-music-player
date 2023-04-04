import React from "react";

const PlaylistItem = (props) => {
  const onChange = () => {
    const audioPlayer = new Audio("./assets/audios/keypress.mp3");
    audioPlayer.volume = 0.5;
    audioPlayer.play();
    props.changeSong(props.name);
  };
  return (
    <div
      style={{
        padding: `${props.textSize * 0.5}px`,
        textShadow: `1px 1px 2px ${props.color}`,
      }}
      className="playlist-item"
      onClick={() => onChange()}
    >
      <p
        style={{
          textShadow: `1px 1px 2px ${props.color}`,
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
