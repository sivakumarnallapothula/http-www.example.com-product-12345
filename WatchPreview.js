import React from "react";
import "./WatchPreview.css";

const WatchPreview = ({ caseType, bandType }) => {
  return (
    <div className="watch-preview">
      <img
        src={`/assets/cases/${caseType}.png`}
        alt={`${caseType} case`}
        className="watch-case"
      />
      <img
        src={`/assets/bands/${bandType}.png`}
        alt={`${bandType} band`}
        className="watch-band"
      />
    </div>
  );
};

export default WatchPreview;
