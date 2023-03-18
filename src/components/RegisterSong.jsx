import React from "react";
import RegisterInput from "./RegisterInput";

const RegisterSong = (props) => {
  const [value, setValue] = React.useState({
    name: "",
    type: "",
    imageType: "",
    background: "#ffffff",
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
    {
      id: 6,
      name: "category",
      type: "text",
      label: "Category",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addSong(value);
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
            width: "80%",
            margin: "auto",
          }}
        >
          You need to enable CEF dev tools to enable inputs.
        </p>
      </div>
      <div className="register-container">
        {check.map((e) => (
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSong;
