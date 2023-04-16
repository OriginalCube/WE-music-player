import React from "react";
import PlaylistItem from "./PlaylistItem";

const Playlist = (props) => {
  const [playlistPages, setPlaylistPages] = React.useState(0);
  const [id, setId] = React.useState(0);
  let audioClicked = new Audio();

  const audioBite = (e) => {
    audioClicked.src = `./assets/audios/${e === 1 ? "notes" : "keypress"}.mp3`;
    audioClicked.volume = 0.4;
    audioClicked.play();
  };

  const onRemoveSong = () => {
    if (props.mainIndex > 2) {
      props.removeSong();
    }
    audioBite(0);
  };

  const onPages = (e) => {
    if (id === 0) {
      if (playlistPages + e >= 0 && playlistPages + e < props.bone.length / 5) {
        setPlaylistPages(playlistPages + e);
      } else {
        setPlaylistPages(0);
      }
    } else {
      const len = props.bone.filter(
        (e) => e.category === props.category[id - 1]
      ).length;

      if (playlistPages + e >= 0 && playlistPages + e < len / 5) {
        setPlaylistPages(playlistPages + e);
      } else {
        setPlaylistPages(0);
      }
    }
    audioBite(1);
  };

  const onPlaylist = () => {
    if (id + 1 <= props.category.length) {
      setId(id + 1);
    } else {
      setId(0);
    }
    setPlaylistPages(0);
    audioBite(0);
  };

  React.useEffect(() => {
    props.onId(id);
  }, [id]);

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
            textShadow: `1px 1px 2px ${props.color}`,
          }}
        >
          {id === 0 ? "Playlist" : props.category[id - 1]}
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
          {id === 0
            ? props.bone
                .slice(playlistPages * 5, playlistPages * 5 + 5)
                .map((e, index) => (
                  <PlaylistItem
                    index={playlistPages * 5 + index}
                    name={e.name}
                    textSize={props.textSize}
                    color={props.color}
                    changeSong={props.changeSong}
                  />
                ))
            : props.bone
                .filter((e) => e.category === props.category[id - 1])
                .slice(playlistPages * 5, playlistPages * 5 + 5)
                .map((e, index) => (
                  <PlaylistItem
                    index={playlistPages * 5 + index}
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
              onClick={() => onPages(-1)}
              alt=""
            />
          </div>
          <div className="playlist-scrollbar-icons">
            <img
              src="./assets/icons/downBar.png"
              onClick={() => onPages(1)}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="playlist-footer flex">
        <div
          className="w-full"
          onClick={() => onRemoveSong()}
          style={{
            textShadow: `1px 1px 2px ${props.color}`,
            padding: `${props.textSize * 0.8}px`,
            fontSize: `${props.textSize * 0.1}rem`,
            borderRight: `2px solid ${props.color}`,
          }}
        >
          <p>Remove Song</p>
        </div>
        <div
          className="w-full"
          onClick={() => onPlaylist()}
          style={{
            textShadow: `1px 1px 2px ${props.color}`,
            padding: `${props.textSize * 0.8}px`,
            fontSize: `${props.textSize * 0.1}rem`,
            borderLeft: `2px solid ${props.color}`,
          }}
        >
          <p>Change Playlist</p>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
