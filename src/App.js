import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "antd";
import * as mmb from "music-metadata-browser";

import "./App.css";
import { setupSong, resolveBpm } from "./lib/helper/audioHelper.js";
import Deck from "./components/Deck";
import Mixer from "./components/Mixer";

const DEFAULT_TRACK_A = "assets/Globular-Dreamland_Overflow.mp3";
const DEFAULT_TRACK_B = "assets/Globular-Kaleidoscope_Tribe.mp3";

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
   * Load default songs released under CC BY-NC-SA 4.0 for noncommercial use.
   * License and attribution: public/assets/LICENSE-CC-BY-NC-SA-4.0.txt
   * Source: https://ektoplazm.com/free-music/globular-entangled-everything
   */
  const setDefaultSongs = async () => {
    const blobA = await fetch(DEFAULT_TRACK_A).then(r => r.blob());
    const metaA = await mmb.parseBlob(blobA, { native: true });
    setupSong(audioContext.current, DEFAULT_TRACK_A)
      .then((song) => {
        const bpm = resolveBpm(song.bpm, metaA.common.bpm);
        setTrackA(song.song);
        setBpmA(bpm);
        setOffsetA(song.offset);
        const meta = metaA.common;
        meta.bpm = bpm;
        setTrackAMeta(meta);
      });
    const blobB = await fetch(DEFAULT_TRACK_B).then(r => r.blob());
    const metaB = await mmb.parseBlob(blobB, { native: true });
    setupSong(audioContext.current, DEFAULT_TRACK_B)
      .then((song) => {
        const bpm = resolveBpm(song.bpm, metaB.common.bpm);
        setTrackB(song.song);
        setBpmB(bpm);
        setOffsetB(song.offset);
        const meta = metaB.common;
        meta.bpm = bpm;
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
      <p className="Credits">
        Default tracks: “Dreamland Overflow” and “Kaleidoscope Tribe” by{" "}
        <a href="https://ektoplazm.com/free-music/globular-entangled-everything" target="_blank" rel="noopener noreferrer">
          Globular (Morison Bennett)
        </a>
        , from the album Entangled Everything. Licensed under{" "}
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
          CC BY-NC-SA 4.0
        </a>
        . Re-encoded from 320 kbps to 128 kbps for web delivery.{" "}
        <a href="assets/LICENSE-CC-BY-NC-SA-4.0.txt" target="_blank" rel="noopener noreferrer">
          Full license and attribution
        </a>
        .
      </p>
    </div>
  );
};

export default App;
