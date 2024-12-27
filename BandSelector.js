import React from "react";
import "./BandSelector.css";

const bands = [
  { id: "sport-black", name: "Sport Band - Black" },
  { id: "sport-white", name: "Sport Band - White" },
  { id: "sport-blue", name: "Sport Band - Blue" },
];

const BandSelector = ({ selectedBand, onBandChange }) => {
  return (
    <div className="band-selector">
      <h3>Select Band</h3>
      <div className="options">
        {bands.map((bandOption) => (
          <div
            key={bandOption.id}
            className={`option ${selectedBand === bandOption.id ? "selected" : ""}`}
            onClick={() => onBandChange(bandOption.id)}
          >
            <img
              src={`/assets/bands/${bandOption.id}.png`}
              alt={bandOption.name}
              className="band-thumbnail"
            />
            <span>{bandOption.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BandSelector;
