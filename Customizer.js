import React, { useState } from "react";
import WatchPreview from "./WatchPreview";
import CaseSelector from "./CaseSelector";
import BandSelector from "./BandSelector";

const Customizer = () => {
  const [selectedCase, setSelectedCase] = useState("silver");
  const [selectedBand, setSelectedBand] = useState("sport-black");

  return (
    <div className="customizer">
      <WatchPreview caseType={selectedCase} bandType={selectedBand} />
      <div className="selectors">
        <CaseSelector selectedCase={selectedCase} onCaseChange={setSelectedCase} />
        <BandSelector selectedBand={selectedBand} onBandChange={setSelectedBand} />
      </div>
    </div>
  );
};

export default Customizer;
