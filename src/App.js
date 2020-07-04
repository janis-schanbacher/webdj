import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "antd";

import "./App.css";
import { setupSong } from "./lib/helper/audioHelper.js";
import Deck from "./components/Deck";
import Mixer from "./components/Mixer";

const App = () => {
  const audioContext = useRef();

  const [trackA, setTrackA] = useState(null);
  const [trackAMeta, setTrackAMeta] = useState({ title: "", artist: "", bpm: 0 });
  const [volumeA, setVolumeA] = useState(1);
  const [lowShelfA, setLowShelfA] = useState(0);
  const [midShelfA, setMidShelfA] = useState(0);
  const [highShelfA, setHighShelfA] = useState(0);
  const [lowPassA, setLowPassA] = useState(0);
  const [highPassA, setHighPassA] = useState(0);

  const [trackB, setTrackB] = useState(null);
  const [trackBMeta, setTrackBMeta] = useState({ title: "", artist: "", bpm: 0 });
  const [volumeB, setVolumeB] = useState(1);
  const [lowShelfB, setLowShelfB] = useState(0);
  const [midShelfB, setMidShelfB] = useState(0);
  const [highShelfB, setHighShelfB] = useState(0);
  const [lowPassB, setLowPassB] = useState(0);
  const [highPassB, setHighPassB] = useState(0);

  const [ready, setReady] = useState(false);
  const [bpmA, setBpmA] = useState();
  const [bpmB, setBpmB] = useState();
  const [offsetA, setOffsetA] = useState();
  const [offsetB, setOffsetB] = useState();
  const [startInSync, setStartInSync] = useState(false);

  /**
   * Set default songs which are relesed under a Creative Commons license for noncommercial usage.
   */
  const setDefaultSongs = () => {
    // https://ektoplazm.com/free-music/digital-family-vol-7
    setupSong(audioContext.current, "assets/Aerodrömme_-_Crop_Circle.mp3").then((song) => {
      setTrackA(song.song);
      setBpmA(song.bpm);
      setOffsetA(song.offset);
    });
    setTrackAMeta({ title: "Aerodrömme_-_Crop_Circle", artist: "Aerodrömme", bpm: bpmA });
    // https://ektoplazm.com/free-music/flembaz-barking-soda
    setupSong(audioContext.current, "assets/Flembaz-Barking_Soda_(Part_1).mp3").then((song) => {
      setTrackB(song.song);
      setBpmB(song.bpm);
      setOffsetB(song.offset);
      setReady(true);
    });
    setTrackBMeta({ title: "Flembaz-Barking_Soda_(Part_1)", artist: "Flembaz", bpm: bpmB });
  };

  useEffect(() => {
    if (!window.AudioContext || window.webkitAudioContext) {
      // eslint-disable-next-line no-alert
      alert("Web Audio API is not supported in this browser!");
      return;
    }
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    setDefaultSongs();
  }, []);

  return (
    <div className="App">
      <Row>
        <Col span={10}>
          <Deck
            audioContext={audioContext}
            audioBuffer={trackA}
            volume={volumeA}
            lowShelf={lowShelfA}
            midShelf={midShelfA}
            highShelf={highShelfA}
            lowPass={lowPassA}
            highPass={highPassA}
            setTrack={setTrackA}
            metadata={trackAMeta}
            setTrackMeta={setTrackAMeta}
            isDeckA
            setBpm={setBpmA}
            setOffset={setOffsetA}
            ready={ready}
            setReady={setReady}
            offset={offsetA}
            startInSync={startInSync}
            setStartInSync={setStartInSync}
            syncDelay
            bpm={bpmA}
          />
        </Col>
        <Col span={4}>
          <Mixer
            setVolumeA={setVolumeA}
            setVolumeB={setVolumeB}
            ready={ready}
            setReady={setReady}
            setStartInSync={setStartInSync}
            setLowShA={setLowShelfA}
            setMidShA={setMidShelfA}
            setHighShA={setHighShelfA}
            setLowPaA={setLowPassA}
            setHighPaA={setHighPassA}
            setLowShB={setLowShelfB}
            setMidShB={setMidShelfB}
            setHighShB={setHighShelfB}
            setLowPaB={setLowPassB}
            setHighPaB={setHighPassB}
          />
        </Col>
        <Col span={10}>
          <Deck
            audioContext={audioContext}
            audioBuffer={trackB}
            volume={volumeB}
            lowShelf={lowShelfB}
            midShelf={midShelfB}
            highShelf={highShelfB}
            lowPass={lowPassB}
            highPass={highPassB}
            setTrack={setTrackB}
            metadata={trackBMeta}
            setTrackMeta={setTrackBMeta}
            isDeckA={false}
            setBpm={setBpmB}
            setOffset={setOffsetB}
            ready={ready}
            setReady={setReady}
            offset={offsetB}
            startInSync={startInSync}
            setStartInSync={setStartInSync}
            syncDelay={false}
            bpm={bpmB}
          />
        </Col>
      </Row>
    </div>
  );
};

export default App;
