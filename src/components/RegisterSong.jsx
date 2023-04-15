import React from "react";
import RegisterInput from "./RegisterInput";

const RegisterSong = (props) => {
  const [colorMode, setColorMode] = React.useState(true);
  const [catValue, setCatValue] = React.useState("");
  const [errMessage, setErrMessage] = React.useState("");
  const [value, setValue] = React.useState({
    name: "",
    type: "",
    imageType: "",
    background: "#000000",
    foreground: "#ffffff",
    category: "",
  });

  const check = [
    {
      id: 1,
      name: "name",
      type: "text",
      label: "Song Name",
      required: true,
    },
    {
      id: 2,
      name: "type",
      type: "text",
      label: "Song Type",
      required: true,
    },

    {
      id: 3,
      name: "imageType",
      type: "text",
      label: "Image type",
      required: true,
    },
    {
      id: 6,
      name: "category",
      type: "text",
      label: "Category",
      required: true,
    },

    {
      id: 4,
      name: "background",
      type: "text",
      label: "Background Color (Hex code)",
      required: true,
    },

    {
      id: 5,
      name: "foreground",
      type: "text",
      label: "Foreground Color (Hex code)",
      required: true,
    },
  ];

  const presetColors = [
    { name: "Red", foreground: "#DA1856", background: "#580D24" },
    { name: "Blue", foreground: "#1876B9", background: "#0C3958" },
    { name: "Yellow", foreground: "#E8A819", background: "#59420E" },
    { name: "Pink", foreground: "#ED709A", background: "#4C2633" },
    { name: "Brown", foreground: "#1B0A25", background: "#4D2E2C" },
  ];

  const onPresetColor = (e) => {
    const tempColor = JSON.parse(e.target.value);
    console.log(tempColor);
    setValue({ ...value, background: tempColor[1], foreground: tempColor[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      value.name === "" ||
      value.category === "" ||
      value.imageType === "" ||
      value.type === ""
    ) {
      alert("Values must not be empty!");
    } else {
      props.addSong(value);
    }
    const audioPlayer = new Audio("./assets/audios/keypress.mp3");
    audioPlayer.volume = 0.5;
    audioPlayer.play();
  };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const changeMode = () => {
    setColorMode(!colorMode);
    const audioPlayer = new Audio("./assets/audios/keypress.mp3");
    audioPlayer.volume = 0.5;
    audioPlayer.play();
  };

  const addCategory = () => {
    if (catValue.length > 0) {
      const updateCategory = props.updateCategory(catValue, "add");
      setErrMessage(updateCategory);
    } else {
      setErrMessage("Textbox must not be empty!");
    }
    const audioPlayer = new Audio("./assets/audios/keypress.mp3");
    audioPlayer.volume = 0.5;
    audioPlayer.play();
  };

  const removeCategory = () => {
    if (catValue.length > 0) {
      const updateCategory = props.updateCategory(catValue, "remove");
      setErrMessage(updateCategory);
    } else {
      setErrMessage("Textbox must not be empty!");
    }
    const audioPlayer = new Audio("./assets/audios/keypress.mp3");
    audioPlayer.volume = 0.5;
    audioPlayer.play();
  };

  return (
    <>
      <div
        className="absolute w-1/5 h-1/6 border-2 border-red-200"
        style={{
          left: "8%",
          top: "10%",
          border: `3px solid ${props.foreground}`,
        }}
      >
        <div className="w-full h-full m-auto text-center flex flex-col">
          <p
            className="h-full"
            style={{
              fontSize: `${props.textSize * 0.12}rem`,
              padding: `${props.textSize * 1}px`,
            }}
          >
            Category Options
            <br />
            <span
              style={{
                fontSize: `${props.textSize * 0.08}rem`,
                color: `${
                  errMessage[errMessage.length - 1] === "!"
                    ? "#ef4444"
                    : "#22c55e"
                }`,
              }}
            >
              {errMessage}
            </span>
          </p>
          <div className="h-full w-5/6 m-auto">
            <input
              style={{
                border: `2px solid ${props.foreground}`,
                fontSize: `${props.textSize * 0.095}rem`,
              }}
              type="text"
              onChange={(e) => setCatValue(e.target.value)}
            />
          </div>
          <div className="flex h-full w-full">
            <button
              onClick={addCategory}
              style={{
                borderTop: `3px solid ${props.foreground}`,
                borderRight: `3px solid ${props.foreground}`,
              }}
              className="h-full w-full"
            >
              Add Category
            </button>
            <button
              onClick={removeCategory}
              style={{ borderTop: `3px solid ${props.foreground}` }}
              className="h-full w-full"
            >
              Remove Category
            </button>{" "}
          </div>
        </div>
      </div>

      <div
        className="register h-3/5 w-1/5 absolute flex flex-col"
        style={{ border: `3px solid ${props.foreground}` }}
      >
        <div
          className="text-center w-full"
          style={{
            height: "10%",
            borderBottom: `3px solid ${props.foreground}`,
          }}
        >
          <p
            className="w-5/6 m-auto"
            style={{ fontSize: `${props.textSize * 0.1}rem` }}
          >
            Check Guide in the Description to add Custom Music!
          </p>
        </div>
        <div
          className="flex flex-col m-auto"
          style={{ height: "80%", width: "90%" }}
        >
          <div className="flex flex-col justify-evenly h-2/3">
            {check.slice(0, 4).map((e) => (
              <RegisterInput
                textSize={props.textSize}
                color={props.foreground}
                key={e.id}
                {...e}
                value={value[e.name]}
                onChange={onChange}
              />
            ))}
          </div>
          <div className="flex " style={{ height: "30%" }}>
            <div className="flex flex-col justify-evenly w-5/6">
              {colorMode ? (
                <div className="w-full flex flex-col">
                  {check.slice(4, 7).map((e) => (
                    <RegisterInput
                      textSize={props.textSize}
                      color={props.foreground}
                      key={e.id}
                      {...e}
                      value={value[e.name]}
                      onChange={onChange}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="w-full flex flex-col h-full"
                  onChange={onPresetColor}
                >
                  {presetColors.map((e) => (
                    <div className="h-full w-full">
                      <label
                        className="font-medium"
                        style={{
                          fontSize: `${props.textSize * 0.1}rem`,
                          textShadow: `1px 1px 2px ${props.foreground}`,
                        }}
                      >
                        <input
                          type="radio"
                          value={JSON.stringify([e.foreground, e.background])}
                          name="presetColor"
                        />
                        {" " + e.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="h-1/3 w-1/6 text-center relative font-medium"
              style={{
                outline: "none",
                border: `2px solid ${props.foreground}`,
                fontSize: `${props.textSize * 0.08}rem`,
                textShadow: `1px 1px 2px ${props.foreground}`,
                top: "35%",
              }}
              onClick={changeMode}
            >
              <p
                className="m-auto "
                style={{ padding: `${props.textSize * 0.5}px` }}
              >
                {colorMode ? "Custom" : "Preset"}
              </p>
            </button>
          </div>
        </div>
        <div className="w-full flex text-center " style={{ height: "10%" }}>
          <div
            onClick={handleSubmit}
            className="w-full"
            style={{
              borderTop: `3px solid ${props.foreground}`,
              fontSize: `${props.textSize * 0.115}rem`,
              padding: `${props.textSize * 1.5}px`,
              textShadow: `1px 1px 2px ${props.foreground}`,
            }}
          >
            <p>Register Song</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSong;
