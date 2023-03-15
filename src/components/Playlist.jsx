import React from "react";
import PlaylistItem from "./PlaylistItem";

const Playlist = (props) => {
  const removeSong = () => {
    props.removeSong();
  };

  React.useEffect(() => {
    console.log("Changes in Playlist");
  }, [props.bone]);

  return (
    <div className="playlist" style={{ border: `3px solid ${props.color}` }}>
      <div>
        <p
          className="playlist-title"
          style={{ borderBottom: `3px solid ${props.color}` }}
        >
          Playlist
        </p>
      </div>
      <div className="playlist-container">
        <div className="playlist-item-container">
          {props.bone.map((e, index) => (
            <PlaylistItem
              changeSong={props.changeSong}
              name={e.name}
              color={props.color}
              index={index}
              key={index}
            />
          ))}
        </div>
        <div
          style={{ borderLeft: `3px solid ${props.color}` }}
          className="playlist-scroll"
        ></div>
      </div>
      <div>
        <p
          onClick={removeSong}
          className="playlist-footer"
          style={{ borderTop: `3px solid ${props.color}` }}
        >
          Remove Current Song
        </p>
      </div>
    </div>
  );
};

export default Playlist;
