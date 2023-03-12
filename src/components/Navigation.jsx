import React from "react";

const Navigation = () => {
  const [setting, setSetting] = React.useState(true);

  const onSetting = () => {
    setSetting(!setting);
  };

  return (
    <>
      <img
        onClick={onSetting}
        src="./assets/icons/setting.png"
        alt=""
        className="navigation-icon"
      />
      {setting ? (
        <div className="navigation-icon-container">
          <img src="./assets/icons/clock.png" alt="" />
          <img src="./assets/icons/sound.png" alt="" />
          <img src="./assets/icons/headphones.png" alt="" />
        </div>
      ) : null}
    </>
  );
};

export default Navigation;
