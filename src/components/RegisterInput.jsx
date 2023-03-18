import React from "react";

const RegisterInput = (props) => {
  const [focused, setFocused] = React.useState(false);
  const { label, onChange, id, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="register-item" style={{ paddingTop: "2.5px" }}>
      <label style={{ fontSize: `${props.textSize * 0.1}rem` }}>{label}</label>
      <br />
      <input
        style={{ border: `2px solid ${props.color}` }}
        {...inputProps}
        className="text-area"
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
    </div>
  );
};

export default RegisterInput;
