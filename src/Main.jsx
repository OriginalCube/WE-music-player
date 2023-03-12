import React from "react";
import Background from "./components/Background";
import Navigation from "./components/Navigation";
import MainData from "./Data.json"; //Temporary data for new install
import MusicPlayer from "./components/MusicPlayer";
import RegisterSong from "./components/RegisterSong";

const Main = () => {
  const [background, setBackground] = React.useState(false);
  const [mainIndex, setMainIndex] = React.useState(2);
  const [bone, setBone] = React.useState();
  const [bgColor, setBgColor] = React.useState("red");
  const [shuffle, setShuffle] = React.useState(false);

  const onBackground = () => {
    setBackground(!background);
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

  const addSong = (e) => {
    const song = {
      id: bone["songs"].length,
      default: false,
      type: e.type,
      imageType: e.imageType,
      name: e.name,
      background: e.background,
      foreground: e.foreground,
      category: e.category,
    };
    const tempArray = bone["songs"];
    tempArray.push(song);
    bone["songs"] = tempArray;
    localStorage.setItem("music-player-03", JSON.stringify(bone));
    // localStorage.setItem("music-player-");
  };

  React.useEffect(() => {
    //set Local Storage
    if (localStorage.getItem("music-player-03")) {
      setBone(JSON.parse(localStorage.getItem("music-player-03")));
    } else {
      localStorage.setItem("music-player-03", JSON.stringify(MainData));
    }
  }, []);

  React.useEffect(() => {}, [bone]);

  return (
    <div
      className="Main"
      style={{
        backgroundColor: bone ? bone["songs"][mainIndex].background : "black",
      }}
    >
      <Background
        node={bone ? bone["songs"][mainIndex] : "./assets/images/That Band.jpg"}
        mode={background}
      />
      <RegisterSong
        addSong={addSong}
        bone={bone}
        mainIndex={mainIndex}
        node={bone ? bone["songs"][mainIndex] : MainData["songs"][0]}
      />
      <Navigation />
      <MusicPlayer
        onSkip={onSkip}
        onPrev={onPrev}
        node={bone ? bone["songs"][mainIndex] : MainData["songs"][0]}
      />
    </div>
  );
};

export default Main;
