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
  const [textSize, setTextSize] = React.useState(10);
  const [presets, setPresets] = React.useState([]);
  //Bones is the main structure that will hold the playlist and the Toggles for the functions
  const [mainIndex, setMainIndex] = React.useState(0);
  const [shuffle, setShuffle] = React.useState(false);
  const [replay, setReplay] = React.useState(false);
  const [clock, setClock] = React.useState(true);
  const [visualizer, setVisualizer] = React.useState(true);
  const [player, setPlayer] = React.useState(true);
  const [playlist, setPlaylist] = React.useState(true);
  const [register, setRegister] = React.useState(true);
  const [category, setCategory] = React.useState([]); //Fix need 2? 1 for id and 1 for the category itself prob not can use the const ?

  // const onBackground = () => {
  //   setBackground(!background);
  // };

  const onClock = () => {
    setClock(!clock);
    changePresets(4, { clock: !clock });
  };

  const onVisualizer = () => {
    setVisualizer(!visualizer);
    changePresets(3, { visualizer: !visualizer });
  };

  const onPlayer = () => {
    setPlayer(!player);
    changePresets(1, { player: !player });
  };

  const onRegister = () => {
    setRegister(!register);
    changePresets(2, { register: !register });
  };

  const onPlaylist = () => {
    setPlaylist(!playlist);
    changePresets(0, { playlist: !playlist });
  };

  const changePresets = (x, y) => {
    let tempPresets = presets;
    tempPresets[x] = y;
    setPresets([...tempPresets]);
    bone["presets"] = tempPresets;
    localStorage.setItem("music-player-03", JSON.stringify(bone));
  };

  const onSkip = () => {
    if (shuffle) {
      if (songList) {
        setMainIndex(Math.floor(songList.length * Math.random()));
      } else {
        setMainIndex(Math.floor(MainData["songs"].length * Math.random()));
      }
    } else {
      if (songList) {
        if (mainIndex + 1 < songList.length) {
          setMainIndex(mainIndex + 1);
        } else {
          setMainIndex(0);
        }
      } else {
        if (mainIndex + 1 < MainData["songs"].length) {
          setMainIndex(mainIndex + 1);
        } else {
          setMainIndex(0);
        }
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
    const musicId = songList.findIndex((bones) => bones.name === e);
    setMainIndex(musicId);
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
    songList.splice(mainIndex, 1);
    setSongList([...songList]);
    setMainIndex(mainIndex - 1);
    bone["songs"] = songList;
    localStorage.setItem("music-player-03", JSON.stringify(bone));
  };

  //Wallpaper Engine Functions
  try {
    window.wallpaperPropertyListener = {
      applyUserProperties: function (properties) {
        setTextSize(properties.fontSize.value);
      },
    };
  } catch (e) {
    console.log(e);
  }

  React.useEffect(() => {
    //set Local Storage
    try {
      if (localStorage.getItem("music-player-03")) {
        const d1 = JSON.parse(localStorage.getItem("music-player-03"));
        setBone(d1);
        setSongList(d1["songs"]);
        setMainIndex(Math.floor(d1["songs"].length * Math.random()));
        const presets = d1["presets"];
        setPresets(d1["presets"]);
        setPlaylist(presets[0].playlist);
        setPlayer(presets[1].player);
        setRegister(presets[2].register);
        setVisualizer(presets[3].visualizer);
        setClock(presets[4].clock);
        setMainIndex(Math.floor(d1["songs"].length * Math.random()));
        const categories = d1["category"];
        setCategory(categories);
      } else {
        setBone(MainData);
        localStorage.setItem("music-player-03", JSON.stringify(MainData));
        setSongList(MainData["songs"]);
        setPresets(MainData["presets"]);
        setMainIndex(Math.floor(MainData["songs"].length - 1 * Math.random()));
      }
    } catch (e) {
      setBone(MainData);
      localStorage.setItem("music-player-03", JSON.stringify(MainData));
      setSongList(MainData["songs"]);
      setPresets(MainData["presets"]);
      setMainIndex(Math.floor(MainData["songs"].length() - 1 * Math.random()));
    }
  }, []);

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
        node={songList ? songList[mainIndex] : MainData["songs"][0]}
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
      {clock ? (
        <Clock
          textSize={textSize}
          color={
            songList
              ? songList[mainIndex].foreground
              : MainData["songs"][0].foreground
          }
        />
      ) : null}
      {register ? (
        <RegisterSong
          textSize={textSize}
          addSong={addSong}
          bone={bone}
          mainIndex={mainIndex}
          foreground={
            songList
              ? songList[mainIndex].foreground
              : MainData["songs"][0].foreground
          }
        />
      ) : null}
      <Navigation
        onRegister={onRegister}
        onPlaylist={onPlaylist}
        onPlayer={onPlayer}
        onClock={onClock}
        onVisualizer={onVisualizer}
      />
      {playlist ? (
        <Playlist
          mainIndex={mainIndex}
          textSize={textSize}
          removeSong={removeSong}
          changeSong={changeSong}
          category={category}
          color={
            bone
              ? songList[mainIndex].foreground
              : MainData["songs"][0].foreground
          }
          bone={songList ? songList : MainData["songs"]}
        />
      ) : null}
      {player ? (
        <MusicPlayer
          setShuffle={setShuffle}
          shuffle={shuffle}
          replay={replay}
          setReplay={setReplay}
          color={
            songList
              ? songList[mainIndex].foreground
              : MainData["songs"][0].foreground
          }
          textSize={textSize}
          onSkip={onSkip}
          onPrev={onPrev}
          node={bone ? songList[mainIndex] : MainData["songs"][0]}
        />
      ) : null}
    </div>
  );
};

export default Main;
