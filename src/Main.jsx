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
  const [categoryId, setCategoryId] = React.useState(0);
  const [id, setId] = React.useState(0);
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

  const onIdChange = () => {
    const findItems = songList.filter((e) => e.category === category[id - 1]);
    const randomGen = Math.floor(findItems.length * Math.random());
    const findItem = songList.findIndex(
      (e) => e.name === findItems[randomGen].name
    );
    setCategoryId(randomGen);
    setMainIndex(findItem);
    console.log(findItems);
    console.log(randomGen);
  };

  const onId = (e) => {
    setId(e);
  };

  React.useEffect(() => {
    if (id > 0) {
      onIdChange();
    }
  }, [id]);

  const onSkip = () => {
    if (shuffle) {
      if (songList) {
        if (id === 0) {
          setMainIndex(Math.floor(songList.length * Math.random()));
        } else {
          onIdChange(); //randomized change
        }
      } else {
        setMainIndex(Math.floor(MainData["songs"].length * Math.random()));
      }
    } else {
      if (songList) {
        if (id === 0) {
          if (mainIndex + 1 < songList.length) {
            setMainIndex(mainIndex + 1);
          } else {
            setMainIndex(0);
          }
        } else {
          const findItems = songList.filter(
            (e) => e.category === category[id - 1]
          );
          const catId = categoryId + 1;
          let key;
          if (catId < findItems.length) {
            setCategoryId(catId);
            key = songList.findIndex((e) => e.name === findItems[catId].name);
          } else {
            key = songList.findIndex((e) => e.name === findItems[0].name);
            setCategoryId(0);
          }
          setMainIndex(key);
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
    if (songList) {
      if (id === 0) {
        if (mainIndex - 1 >= 0) {
          setMainIndex(mainIndex - 1);
        } else {
          setMainIndex(songList.length - 1);
        }
      } else {
        const findItems = songList.filter(
          (e) => e.category === category[id - 1]
        );
        const catId = categoryId - 1;
        let key;
        if (catId >= 0) {
          setCategoryId(catId);
          key = songList.findIndex((e) => e.name === findItems[catId].name);
        } else {
          key = songList.findIndex(
            (e) => e.name === findItems[findItems.length - 1].name
          );
          setCategoryId(findItems.length - 1);
        }
        setMainIndex(key);
      }
    } else {
      if (mainIndex - 1 >= 0) {
        setMainIndex(mainIndex - 1);
      } else {
        setMainIndex(MainData["songs"].length - 1);
      }
    }
  };

  const changeSong = (e) => {
    let musicId;
    musicId = songList.findIndex((bones) => bones.name === e);
    if (id !== 0) {
      const findItems = songList.filter((e) => e.category === category[id - 1]);
      const catId = findItems.findIndex(
        (e) => e.name === songList[musicId].name
      );
      setCategoryId(catId);
    }
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

  const updateCategory = (x, m) => {
    if (m === "add") {
      const categoryChecker = category.some((res) => res === x);
      if (!categoryChecker) {
        category.push(x);
        setCategory([...category]);
        bone["category"] = category;
        localStorage.setItem("music-player-03", JSON.stringify(bone));
        return "Added successfully.";
      } else {
        return "The category name already exists!";
      }
    } else if (m === "remove") {
      const categoryChecker = category.findIndex((res) => res === x);
      if (categoryChecker !== -1) {
        category.splice(categoryChecker, 1);
        setCategory([...category]);
        bone["category"] = category;
        localStorage.setItem("music-player-03", JSON.stringify(bone));
        return "Removed successfully.";
      } else {
        return "The category name does not exist!";
      }
    }
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

  React.useEffect(() => {
    console.log(id);
  }, [id]);

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
          updateCategory={updateCategory}
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
          onId={onId}
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
