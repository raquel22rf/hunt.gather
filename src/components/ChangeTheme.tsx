import React, { useEffect } from "react";
import { themeChange } from "theme-change";

const ChangeTheme = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex my-1 mb-0">
      <button className="btn btn-outline my-1 btn-xs" data-set-theme="light">
        Light
      </button>
      <button
        className="btn btn-outline btn-secondary my-1 mx-1 btn-xs"
        data-set-theme="dark"
      >
        Dark
      </button>
    </div>
  );
};

export default ChangeTheme;
