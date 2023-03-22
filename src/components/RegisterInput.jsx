import { type } from "@testing-library/user-event/dist/type";
import React from "react";

const RegisterInput = (props) => {
  const [focused, setFocused] = React.useState(false);
  const { label, onChange, id, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="register-item" style={{ paddingTop: "2.5px" }}>
      <label
        style={{
          fontSize: `${props.textSize * 0.1}rem`,
          textShadow: `1px 1px 2px ${props.color}`,
        }}
      >
        {label}
      </label>
      <br />
      <input
        style={{
          border: `2px solid ${props.color}`,
          fontSize: `${props.textSize * 0.095}rem`,
        }}
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
