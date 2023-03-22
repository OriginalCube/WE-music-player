import React from "react";

const MusicPlayer = (props) => {
  let keypress = new Audio();
  const [isPlaying, setPlaying] = React.useState(false);
  const [trackProgress, setProgress] = React.useState(0);
  const [volume, setVolume] = React.useState(
    localStorage.getItem("volume") !== null
      ? +localStorage.getItem("volume")
      : 0.2
  );

  const intervalRef = React.useRef();
  const audioRef = React.useRef(new Audio());
  const isReady = React.useRef(true);
  const { duration } = audioRef.current;

  const clickAudio = (e) => {
    keypress.src = `./assets/audios/${e === 0 ? "keypress" : "notes"}.mp3`;
    keypress.volume = 0.5;
    keypress.play();
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        if (props.replay === true) {
          audioRef.current.play();
        } else {
          onSkip();
        }
      } else {
        setProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    setPlaying(false);
    startTimer();
  };

  const onPrev = () => {
    props.onPrev();
    clickAudio(0);
  };

  const onSkip = () => {
    props.onSkip();
    clickAudio(0);
  };

  const onPlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
    clickAudio(1);
  };

  const lessVolume = () => {
    if (volume - 0.1 > 0) {
      setVolume(Math.round((volume - 0.1) * 10) / 10);
    } else {
      setVolume(0);
    }
    clickAudio(0);
  };

  const addVolume = () => {
    if (volume >= 0 && volume + 0.1 <= 1) {
      setVolume(volume + 0.1);
    }
    clickAudio(0);
  };

  const onReplay = () => {
    props.setShuffle(false);
    props.setReplay(!props.replay);
    clickAudio(0);
  };

  const onShuffle = () => {
    props.setReplay(false);
    props.setShuffle(!props.shuffle);
    clickAudio(0);
  };

  React.useEffect(() => {
    audioRef.current.volume = volume;
    localStorage.setItem("volume", volume);
  }, [volume]);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      startTimer();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  React.useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(
      `./assets/songs/${props.node.name}.${props.node.type}`
    );
    audioRef.current.volume = volume;
    if (isReady.current) {
      audioRef.current.play();
      setPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
    setPlaying(audioRef.isPlaying);
  }, [props.node]);

  React.useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="player">
      <p
        className="player-text"
        style={{
          fontSize: `${props.textSize * 0.125}rem`,
          textShadow: `1px 1px 2px ${props.color}`,
        }}
      >
        {props.node.name}
      </p>
      <input
        type="range"
        step="1"
        min="0"
        value={trackProgress}
        max={duration ? duration : `${duration}`}
        className="audio-bar"
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
      />

      <div>
        <img
          className="audio-icon"
          onClick={onReplay}
          style={{ marginLeft: "0%", opacity: ".85" }}
          alt=""
          src={
            props.replay
              ? "./assets/icons/replayToggle.png"
              : "./assets/icons/replay.png"
          }
        />
        <img
          className="audio-icon"
          onClick={lessVolume}
          alt=""
          src="./assets/icons/volumeMinus.png"
        />
        <img
          className="audio-icon"
          onClick={onPrev}
          alt=""
          src="./assets/icons/backward.png"
        />
        <img
          className="audio-icon"
          onClick={onPlay}
          src={`./assets/icons/${isPlaying ? "play" : "pause"}.png`}
          alt=""
        />
        <img
          className="audio-icon"
          onClick={onSkip}
          alt=""
          src="./assets/icons/forward.png"
        />
        <img
          className="audio-icon"
          onClick={addVolume}
          alt=""
          src="./assets/icons/volumePlus.png"
        />
        <img
          className="audio-icon"
          onClick={onShuffle}
          style={{ opacity: ".85" }}
          alt=""
          src={
            props.shuffle
              ? "./assets/icons/shuffleToggle.png"
              : "./assets/icons/shuffle.png"
          }
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
