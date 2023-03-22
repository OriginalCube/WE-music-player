import React from "react";

const Clock = (props) => {
  const [hour, setHour] = React.useState("00");
  const [minute, setMinute] = React.useState("0");
  const [second, setSecond] = React.useState("");
  React.useEffect(() => {
    setInterval(() => {
      let currentTime = new Date();
      setHour(currentTime.getHours());
      setMinute(currentTime.getMinutes());
      setSecond(currentTime.getSeconds());
    }, 1000);
  }, []);

  return (
    <p
      className={`main-clock absolute opacity-80`}
      style={{
        fontSize: `${props.textSize * 0.8}rem`,
        top: "79vh",
        right: "2vw",
        color: `white`,
        textShadow: `4px 3px ${props.color}`,
      }}
    >
      {hour + ":"}
      {minute > 9 ? minute : "0" + minute}
      <span
        className={`main-second relative top-2/3`}
        style={{
          color: `white`,
          textShadow: `1.5px 1.5px ${props.color}`,
          fontSize: `${props.textSize * 0.1875}rem`,
        }}
      >
        {second > 9 ? second : "0" + second}
      </span>
    </p>
  );
};

export default Clock;
