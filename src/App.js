import React, { useState, useEffect, useRef } from "react";

import { setupSong, playSong } from "./lib/helper/audioHelper.js";

const App = () => {
  const audioContext = useRef();
  const [trackA, setTrackA] = useState(null);
  const [trackAMeta, setTrackAMeta] = useState({ name: "" });
  const [trackB, setTrackB] = useState(null);
  const [trackBMeta, setTrackBMeta] = useState({ name: "" });

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();

    // https://ektoplazm.com/free-music/digital-family-vol-7 Released under a Creative Commons license for noncommercial usage. 128 bpm
    setupSong(audioContext.current, "assets/Medular-Neuroluminescence.mp3").then(song => setTrackA(song));
    setTrackAMeta({ name: "Medular-Neuroluminescence.mp3" });
    // https://ektoplazm.com/free-music/flembaz-barking-soda Released under a Creative Commons license for noncommercial usage. 128 bpm
    setupSong(audioContext.current, "assets/Flembaz-Barking_Soda_(Part_1).mp3").then(song => setTrackB(song));
    setTrackBMeta({ name: "Flembaz-Barking_Soda_(Part_1).mp3" });
  }, []);

  const changeTrackA = (song) => {
    console.log(song);
    const songUrl = window.URL.createObjectURL(song);
    setupSong(audioContext.current, songUrl).then(song => setTrackA(song));
    setTrackAMeta({ name: song.name });
  };

  const changeTrackB = (song) => {
    const songUrl = window.URL.createObjectURL(song);
    setupSong(audioContext.current, songUrl).then(song => setTrackB(song));
    setTrackBMeta({ name: song.name });
  };

  return (
    <div className="App">
      <div
        onDragEnter={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.stopPropagation();
          e.preventDefault();
          changeTrackA(e.dataTransfer.files[0]);
        }}
      >
        <h2>Track A: {trackAMeta.name}</h2>
        <button onClick={() => { playSong(audioContext.current, trackA); }}>Play </button>
        <label htmlFor="trackAInput" style={{ cursor: "pointer", border: "1px solid #ccc" }}>Select Song</label>
        <input id="trackAInput" type="file" accept="audio/*" onChange={e => (changeTrackA(e.target.files[0]))} style={{ visibility: "hidden" }} />
      </div>

      <div
        onDragEnter={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.stopPropagation();
          e.preventDefault();
          changeTrackB(e.dataTransfer.files[0]);
        }}
      >
        <h2>Track B: {trackBMeta.name}</h2>
        <button onClick={() => { playSong(audioContext.current, trackB); }}>Play </button>
        <label htmlFor="trackBInput" style={{ cursor: "pointer", border: "1px solid #ccc" }}>Select Song</label>
        <input id="trackBInput" type="file" accept="audio/*" onChange={e => (changeTrackB(e.target.files[0]))} style={{ visibility: "hidden" }} />
      </div>

    </div>
  );
};

export default App;
