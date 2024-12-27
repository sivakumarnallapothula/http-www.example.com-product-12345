import React from "react";
import "./CaseSelector.css";

const cases = [
  { id: "silver", name: "Silver Aluminum" },
  { id: "gold", name: "Gold Aluminum" },
  { id: "space-gray", name: "Space Gray Aluminum" },
];

const CaseSelector = ({ selectedCase, onCaseChange }) => {
  return (
    <div className="case-selector">
      <h3>Select Case</h3>
      <div className="options">
        {cases.map((caseOption) => (
          <div
            key={caseOption.id}
            className={`option ${selectedCase === caseOption.id ? "selected" : ""}`}
            onClick={() => onCaseChange(caseOption.id)}
          >
            <img
              src={`/assets/cases/${caseOption.id}.png`}
              alt={caseOption.name}
              className="case-thumbnail"
            />
            <span>{caseOption.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseSelector;
