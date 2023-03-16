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
    <div className="playlist" style={{ border: `3px solid ${props.color}` }}>
      <div>
        <p
          className="playlist-title"
          style={{
            borderBottom: `3px solid ${props.color}`,
            fontSize: `${props.textSize * 0.3}rem`,
          }}
        >
          Playlist
        </p>
      </div>
      <div className="playlist-container">
        <div className="playlist-item-container">
          {props.bone
            .slice(playlistPages * 8, playlistPages * 8 + 8)
            .map((e, index) => (
              <PlaylistItem
                textSize={props.textSize}
                changeSong={props.changeSong}
                name={e.name}
                color={props.color}
                index={playlistPages * 8 + index}
                key={index}
              />
            ))}
        </div>
        <div
          style={{ borderLeft: `3px solid ${props.color}` }}
          className="playlist-scroll"
        >
          <div className="playlist-scroll-icon">
            <img
              onClick={() => onPages(1)}
              src="./assets/icons/upBar.png"
              alt=""
            />
            <img
              onClick={() => onPages(-1)}
              src="./assets/icons/downBar.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <p
          onClick={removeSong}
          className="playlist-footer"
          style={{
            borderTop: `3px solid ${props.color}`,
            fontSize: `${props.textSize * 0.25}rem`,
          }}
        >
          Remove Current Song
        </p>
      </div>
    </div>
  );
};

export default Playlist;
