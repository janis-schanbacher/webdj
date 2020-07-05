import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "antd";
import * as mmb from "music-metadata-browser";

import "./App.css";
import { setupSong } from "./lib/helper/audioHelper.js";
import Deck from "./components/Deck";
import Mixer from "./components/Mixer";

const App = () => {
  const audioContext = useRef();

  const [trackA, setTrackA] = useState(null);
  const [trackAMeta, setTrackAMeta] = useState({
    title: "",
    artist: "",
    bpm: 0,
  });
  const [volumeA, setVolumeA] = useState(1);
  const [lowShelfA, setLowShelfA] = useState(0);
  const [midShelfA, setMidShelfA] = useState(0);
  const [highShelfA, setHighShelfA] = useState(0);
  const [lowPassA, setLowPassA] = useState(0);
  const [highPassA, setHighPassA] = useState(0);

  const [trackB, setTrackB] = useState(null);
  const [trackBMeta, setTrackBMeta] = useState({
    title: "",
    artist: "",
    bpm: 0,
  });
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
  const [syncAvailable, setSyncAvailable] = useState(false);

  /**
   * Set default songs which are relesed under a Creative Commons license for noncommercial usage.
   */
  const setDefaultSongs = async () => {
    // https://ektoplazm.com/free-music/digital-family-vol-7

    const blobA = await fetch("assets/Aerodrömme_-_Crop_Circle.mp3").then(r => r.blob());
    const metaA = await mmb.parseBlob(blobA, { native: true });
    setupSong(audioContext.current, "assets/Aerodrömme_-_Crop_Circle.mp3")
      .then((song) => {
        setTrackA(song.song);
        setBpmA(song.bpm);
        setOffsetA(song.offset);
        const meta = metaA.common;
        meta.bpm = song.bpm;
        setTrackAMeta(meta);
      });
    // https://ektoplazm.com/free-music/flembaz-barking-soda
    const blobB = await fetch("assets/Flembaz-Barking_Soda_(Part_1).mp3").then(r => r.blob());
    const metaB = await mmb.parseBlob(blobB, { native: true });
    setupSong(audioContext.current, "assets/Flembaz-Barking_Soda_(Part_1).mp3")
      .then((song) => {
        setTrackB(song.song);
        setBpmB(song.bpm);
        setOffsetB(song.offset);
        const meta = metaB.common;
        meta.bpm = song.bpm;
        setTrackBMeta(meta);
        setReady(true);
      });
  };

  useEffect(() => {
    if (!window.AudioContext || window.webkitAudioContext) {
      // eslint-disable-next-line no-alert
      alert("Web Audio API is not supported in this browser!");
      return;
    }
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    setDefaultSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bpmA && bpmB) {
      setSyncAvailable(bpmA === bpmB);
    }
  }, [bpmA, bpmB]);

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
            syncAvailable={syncAvailable}
            startInSync={startInSync}
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
