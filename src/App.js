import React, { useState, useEffect, useRef } from "react";
import * as mmb from "music-metadata-browser";

import { setupSong, playSong } from "./lib/helper/audioHelper.js";

const App = () => {
  const audioContext = useRef();
  const [trackA, setTrackA] = useState(null);
  const [trackAMeta, setTrackAMeta] = useState({ name: "" });
  const [trackB, setTrackB] = useState(null);
  const [trackBMeta, setTrackBMeta] = useState({ name: "" });

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();

    // Set default songs which are relesed under a Creative Commons license for noncommercial usage.
    // https://ektoplazm.com/free-music/digital-family-vol-7
    setupSong(audioContext.current, "assets/Medular-Neuroluminescence.mp3").then(song => setTrackA(song));
    setTrackAMeta({ title: "Neuroluminescence", artist: "Medular", bpm: 128 });
    // https://ektoplazm.com/free-music/flembaz-barking-soda
    setupSong(audioContext.current, "assets/Flembaz-Barking_Soda_(Part_1).mp3").then(song => setTrackB(song));
    setTrackBMeta({ title: "Flembaz-Barking_Soda_(Part_1)", artist: "Flembaz", bpm: 128 });
  }, []);

  const changeTrackA = (song) => {
    mmb.parseBlob(song, { native: true }).then((metadata) => {
      setTrackAMeta(metadata.common);
    });
    const songUrl = window.URL.createObjectURL(song);
    setupSong(audioContext.current, songUrl).then(songAudioBuffer => setTrackA(songAudioBuffer));
  };

  const changeTrackB = (song) => {
    mmb.parseBlob(song, { native: true }).then((metadata) => {
      setTrackBMeta(metadata.common);
    });
    const songUrl = window.URL.createObjectURL(song);
    setupSong(audioContext.current, songUrl).then(songAudioBuffer => setTrackB(songAudioBuffer));
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
        <h2>Track A: {trackAMeta.artist} - {trackAMeta.title} - {trackAMeta.bpm}bpm</h2>
        <button type="button" onClick={() => { playSong(audioContext.current, trackA); }}>Play </button>
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
        <h2>Track B: {trackBMeta.artist} - {trackBMeta.title} - {trackBMeta.bpm}bpm</h2>
        <button type="button" onClick={() => { playSong(audioContext.current, trackB); }}>Play </button>
        <label htmlFor="trackBInput" style={{ cursor: "pointer", border: "1px solid #ccc" }}>Select Song</label>
        <input id="trackBInput" type="file" accept="audio/*" onChange={e => (changeTrackB(e.target.files[0]))} style={{ visibility: "hidden" }} />
      </div>

    </div>
  );
};

export default App;
