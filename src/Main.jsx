import React from "react";
import Background from "./components/Background";
import Navigation from "./components/Navigation";
import MainData from "./Data.json"; //Temporary data for new install
import MusicPlayer from "./components/MusicPlayer";

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
