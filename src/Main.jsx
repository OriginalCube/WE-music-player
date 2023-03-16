import React from "react";
import Background from "./components/Background";
import Navigation from "./components/Navigation";
import MainData from "./Data.json"; //Temporary data for new install
import MusicPlayer from "./components/MusicPlayer";
import RegisterSong from "./components/RegisterSong";
import AudioVisualizer from "./components/AudioVisualizer";
import Clock from "./components/Clock";
import Playlist from "./components/Playlist";

const Main = () => {
  const [background, setBackground] = React.useState(false);
  const [songList, setSongList] = React.useState();
  const [bone, setBone] = React.useState();
  //Bones is the main structure that will hold the playlist and the Toggles for the functions
  const [mainIndex, setMainIndex] = React.useState();
  const [shuffle, setShuffle] = React.useState(false);
  const [clock, setClock] = React.useState(true);
  const [visualizer, setVisualizer] = React.useState(true);
  const [player, setPlayer] = React.useState(true);

  const onBackground = () => {
    setBackground(!background);
  };

  const onClock = () => {
    setClock(!clock);
  };

  const onVisualizer = () => {
    setVisualizer(!visualizer);
  };

  const onPlayer = () => {
    setPlayer(!player);
  };

  const onSkip = () => {
    if (shuffle) {
      console.log("random songs");
    } else {
      if (mainIndex + 1 < bone["songs"].length) {
        setMainIndex(mainIndex + 1);
      } else {
        setMainIndex(0);
      }
    }
  };

  const onPrev = () => {
    if (mainIndex - 1 >= 0) {
      setMainIndex(mainIndex - 1);
    } else {
      setMainIndex(bone["songs"].length - 1);
    }
  };

  const changeSong = (e) => {
    setMainIndex(e);
  };

  const addSong = (e) => {
    const song = {
      id: bone["songs"].length,
      default: false,
      type: e.type,
      imageType: e.imageType,
      name: e.name,
      background: e.background[0] === "#" ? e.background : `#${e.background}`,
      foreground: e.foreground[0] === "#" ? e.foreground : `#${e.foreground}`,
      category: e.category,
    };
    songList.push(song);
    bone["songs"] = songList;
    localStorage.setItem("music-player-03", JSON.stringify(bone));
    setSongList([...songList]);
  };

  const removeSong = () => {
    if (mainIndex > 2) {
      songList.splice(mainIndex, 1);
      setSongList([...songList]);
      setMainIndex(mainIndex - 1);
      bone["songs"] = songList;
      localStorage.setItem("music-player-03", JSON.stringify(bone));
    }
  };

  React.useEffect(() => {
    //set Local Storage
    if (localStorage.getItem("music-player-03")) {
      const d1 = JSON.parse(localStorage.getItem("music-player-03"));
      setBone(d1);
      setSongList(d1["songs"]);
      setMainIndex(Math.floor(Math.random() * d1["songs"].length));
    } else {
      setBone(MainData);
      localStorage.setItem("music-player-03", JSON.stringify(MainData));
    }
  }, []);

  React.useEffect(() => {
    console.log(songList);
  }, [songList]);

  return (
    <div
      className="Main"
      style={{
        backgroundColor: bone
          ? songList[mainIndex].background
          : MainData["songs"][0].background,
      }}
    >
      <Background
        node={bone ? bone["songs"][mainIndex] : "./assets/images/That Band.jpg"}
        mode={background}
      />
      {visualizer ? (
        <AudioVisualizer
          lineColor={
            bone
              ? songList[mainIndex].foreground
              : MainData["songs"][0].foreground
          }
        />
      ) : null}
      {clock ? <Clock /> : null}
      <RegisterSong
        addSong={addSong}
        bone={bone}
        mainIndex={mainIndex}
        foreground={
          songList
            ? songList[mainIndex].foreground
            : MainData["songs"][0].foreground
        }
      />
      <Navigation
        onPlayer={onPlayer}
        onClock={onClock}
        onVisualizer={onVisualizer}
      />
      <Playlist
        removeSong={removeSong}
        changeSong={changeSong}
        color={
          bone
            ? songList[mainIndex].foreground
            : MainData["songs"][0].foreground
        }
        bone={songList ? songList : MainData["songs"]}
      />
      {player ? (
        <MusicPlayer
          onSkip={onSkip}
          onPrev={onPrev}
          node={bone ? songList[mainIndex] : MainData["songs"][0]}
        />
      ) : null}
    </div>
  );
};

export default Main;
