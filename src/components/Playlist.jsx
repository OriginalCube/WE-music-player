import React from "react";
import PlaylistItem from "./PlaylistItem";

const Playlist = (props) => {
  const [playlistPages, setPlaylistPages] = React.useState(0);

  const removeSong = () => {
    props.removeSong();
  };

  const onPages = (e) => {
    if (playlistPages + e >= 0 && playlistPages + e < props.bone.length / 8) {
      setPlaylistPages(playlistPages + e);
    } else {
      setPlaylistPages(0);
    }
  };

  React.useEffect(() => {
    console.log("Changes in Playlist");
  }, [props.bone]);

  return (
    <div
      className="playlist-container"
      style={{ border: `3px solid ${props.color}` }}
    >
      <div className="playlist-navigation">
        <p
          style={{
            padding: `${props.textSize * 0.8}px`,
            fontSize: `${props.textSize * 0.125}rem`,
          }}
        >
          Playlist
        </p>
      </div>
      <div
        className="playlist"
        style={{
          borderTop: `3px solid ${props.color}`,
          borderBottom: `3px solid ${props.color}`,
        }}
      >
        <div className="playlist-item-container">
          {props.bone
            .slice(playlistPages * 8, playlistPages * 8 + 8)
            .map((e, index) => (
              <PlaylistItem
                index={playlistPages * 8 + index}
                name={e.name}
                textSize={props.textSize}
                color={props.color}
                changeSong={props.changeSong}
              />
            ))}
        </div>
        <div
          className="playlist-scrollbar"
          style={{ borderLeft: `3px solid ${props.color}` }}
        >
          <div className="playlist-scrollbar-icons">
            <img
              src="./assets/icons/upBar.png"
              onClick={() => onPages(1)}
              alt=""
            />
          </div>
          <div className="playlist-scrollbar-icons">
            <img
              src="./assets/icons/downBar.png"
              onClick={() => onPages(-1)}
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        className="playlist-footer"
        style={{
          padding: `${props.textSize * 0.8}px`,
          fontSize: `${props.textSize * 0.125}rem`,
        }}
      >
        <p onClick={() => props.removeSong()}>Remove Song</p>
      </div>
    </div>
  );
};

export default Playlist;
