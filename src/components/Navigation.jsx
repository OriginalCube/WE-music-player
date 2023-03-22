import React from "react";

const Navigation = (props) => {
  const [setting, setSetting] = React.useState(false);
  let audioPlayer = new Audio();

  const onSound = (e) => {
    if (e === 1) {
      audioPlayer.src = "./assets/audios/keypress.mp3";
    } else {
      audioPlayer.src = "./assets/audios/notes.mp3";
    }
    audioPlayer.volume = 0.3;
    audioPlayer.play();
  };

  const onClock = () => {
    props.onClock();
    onSound(1);
  };

  const onVisualizer = () => {
    props.onVisualizer();
    onSound(1);
  };

  const onPlayer = () => {
    props.onPlayer();
    onSound(1);
  };

  const onPlaylist = () => {
    props.onPlaylist();
    onSound(1);
  };

  const onRegister = () => {
    props.onRegister();
    onSound(1);
  };

  const onSetting = () => {
    setSetting(!setting);
    onSound(0);
  };

  return (
    <>
      <img
        onClick={onSetting}
        src="./assets/icons/setting.png"
        alt=""
        className="navigation-icon"
      />
      {setting ? (
        <div className="navigation-icon-container">
          <img onClick={onClock} src="./assets/icons/clock.png" alt="" />
          <img onClick={onVisualizer} src="./assets/icons/sound.png" alt="" />
          <img onClick={onPlayer} src="./assets/icons/headphones.png" alt="" />
          <img onClick={onPlaylist} src="./assets/icons/playlist.png" alt="" />
          <img onClick={onRegister} src="./assets/icons/register.png" alt="" />
        </div>
      ) : null}
    </>
  );
};

export default Navigation;
