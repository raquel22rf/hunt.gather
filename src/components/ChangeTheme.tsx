import React, { useEffect } from "react";
import { themeChange } from "theme-change";

const ChangeTheme = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div>
      <button
        className="btn btn-outline my-2 mx-2 btn-xs"
        data-set-theme="light"
      >
        Light
      </button>
      <button
        className="btn btn-outline btn-secondary my-2 btn-xs"
        data-set-theme="dark"
      >
        Dark
      </button>
    </div>
  );
};

export default ChangeTheme;
