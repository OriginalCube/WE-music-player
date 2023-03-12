import React from "react";

const RegisterInput = (props) => {
  const [focused, setFocused] = React.useState(false);
  const { label, onChange, id, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div>
      <label>{label}</label>
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
