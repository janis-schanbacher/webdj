import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import { setupSong } from "./lib/helper/audioHelper.js";
import Deck from "./components/Deck.jsx";

const App = () => {
  const audioContext = useRef();
  const [trackA, setTrackA] = useState(null);
  const [trackAMeta, setTrackAMeta] = useState({ title: "", artist: "", bpm: 0 });
  const [trackB, setTrackB] = useState(null);
  const [trackBMeta, setTrackBMeta] = useState({ title: "", artist: "", bpm: 0 });

  /**
   * Set default songs which are relesed under a Creative Commons license for noncommercial usage.
   */
  const setDefaultSongs = () => {
    // https://ektoplazm.com/free-music/digital-family-vol-7
    setupSong(audioContext.current, "assets/Medular-Neuroluminescence.mp3").then(song => setTrackA(song));
    setTrackAMeta({ title: "Neuroluminescence", artist: "Medular", bpm: 128 });
    // https://ektoplazm.com/free-music/flembaz-barking-soda
    setupSong(audioContext.current, "assets/Flembaz-Barking_Soda_(Part_1).mp3").then(song => setTrackB(song));
    setTrackBMeta({ title: "Flembaz-Barking_Soda_(Part_1)", artist: "Flembaz", bpm: 128 });
  };

  useEffect(() => {
    if (!window.AudioContext || window.webkitAudioContext) {
      alert("Web Audio API is not supported in this browser!");
      return;
    }
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    setDefaultSongs();
  }, []);

  return (
    <div className="App">
      <Deck
        audioContext={audioContext}
        audioBuffer={trackA}
        setTrack={setTrackA}
        metadata={trackAMeta}
        setTrackMeta={setTrackAMeta}
      />
      <Deck
        audioContext={audioContext}
        audioBuffer={trackB}
        setTrack={setTrackB}
        metadata={trackBMeta}
        setTrackMeta={setTrackBMeta}
      />
    </div>
  );
};

export default App;
