import React from "react";
import RegisterInput from "./RegisterInput";

const RegisterSong = (props) => {
  const [colorMode, setColorMode] = React.useState(false);
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

  return (
    <div
      className="register"
      style={{ border: `3px solid ${props.foreground}` }}
    >
      <div
        className="register-header"
        style={{ borderBottom: `3px solid ${props.foreground}` }}
      >
        <p
          style={{
            fontSize: `${props.textSize * 0.1}rem`,
            textShadow: `1px 1px 2px ${props.foreground}`,
            width: "80%",
            margin: "auto",
          }}
        >
          You need to enable CEF dev tools to enable inputs.
        </p>
      </div>
      <div className="flex flex-col" style={{ height: "90%" }}>
        <div className="register-container">
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

        <div className=" flex m-auto" style={{ width: "90%", height: "35%" }}>
          <div className="flex flex-col w-full">
            {colorMode ? (
              check
                .slice(4, 7)
                .map((e) => (
                  <RegisterInput
                    textSize={props.textSize}
                    color={props.foreground}
                    key={e.id}
                    {...e}
                    value={value[e.name]}
                    onChange={onChange}
                  />
                ))
            ) : (
              <div
                className="h-full w-full flex flex-nowrap flex-col"
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
          <div style={{ width: "25%" }} className="h-full">
            <button
              className="h-1/3 w-full text-center relative font-medium"
              style={{
                outline: "none",
                border: `2px solid ${props.foreground}`,
                fontSize: `${props.textSize * 0.08}rem`,
                textShadow: `1px 1px 2px ${props.foreground}`,
                top: "35%",
              }}
              onClick={() => setColorMode(!colorMode)}
            >
              {!colorMode ? "Custom" : "Preset"}
            </button>
          </div>
        </div>
      </div>
      <div className="register-footer">
        <div className="register-footer-button">
          <button
            onClick={handleSubmit}
            style={{
              padding: `${props.textSize * 0.2}px ${props.textSize * 1}px`,
              fontSize: `${props.textSize * 0.1}rem`,
              border: `2px solid ${props.foreground}`,
            }}
          >
            Submit Music
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: `${props.textSize * 0.2}px ${props.textSize * 1}px`,
              fontSize: `${props.textSize * 0.1}rem`,
              border: `2px solid ${props.foreground}`,
            }}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSong;
