import React, { useState, useEffect } from "react";

import { setupSong, playSong } from "./lib/helper/audioHelper.js";

const App = () => {
  const [audioCtx, setAudioCtx] = useState(null);
  const [trackA, setTrackA] = useState(null);
  const [trackB, setTrackB] = useState(null);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    setAudioCtx(audioContext);
    // https://ektoplazm.com/free-music/digital-family-vol-7 Released under a Creative Commons license for noncommercial usage. 128 bpm
    setupSong(audioContext, "assets/Medular-Neuroluminescence.mp3").then(song => setTrackA(song));
    // https://ektoplazm.com/free-music/flembaz-barking-soda Released under a Creative Commons license for noncommercial usage. 128 bpm
    setupSong(audioContext, "assets/Flembaz-Barking_Soda_(Part_1).mp3").then(song => setTrackB(song));
  }, []);


  return (
    <div className="App">
      <h2>Track A</h2>
      <button onClick={() => { playSong(audioCtx, trackA); }}>Play </button>

      <h2>Track B</h2>
      <button onClick={() => { playSong(audioCtx, trackB); }}>Play </button>
    </div>
  );
};

export default App;
