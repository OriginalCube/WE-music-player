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
      label: "category",
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
      style={{ border: `2px solid ${props.node.foreground}` }}
    >
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <p style={{ textAlign: "center", marginTop: "2%" }}>
            You Need to enable CEF devtools port to input texts.
          </p>
          {check.map((e) => (
            <RegisterInput
              color={props.node.foreground}
              key={e.id}
              {...e}
              value={value[e.name]}
              onChange={onChange}
            />
          ))}
          <button className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterSong;
