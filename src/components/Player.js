/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Radio } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

import Visualizer from "./Visualizer";
import BeatJumper from "./BeatJumper";
import Looper from "./Looper";
import { Wrapper } from "./styles/Player.styles";

const Player = ({
  audioContext,
  audioBuffer,
  volume,
  isDeckA,
  highSh,
  midSh,
  lowSh,
  highPassIn,
  lowPassIn,
  ready,
  offset,
  startInSync,
  syncDelay,
  bpm,
}) => {
  const [bufferSource, setBufferSource] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [pausedAt, setPausedAt] = useState(null);
  const [highShelf, setHighShelf] = useState(null);
  const [midShelf, setMidShelf] = useState(null);
  const [lowShelf, setLowShelf] = useState(null);
  const [highPass, setHighPass] = useState(null);
  const [lowPass, setLowPass] = useState(null);
  const lowerBandThreshold = 300.0;
  const higherBandThreshold = 2000.0;
  const [loop, setLoop] = useState(false);
  const [selection, setSelection] = useState(16);

  const createGainNode = () => {
    if (audioContext == null) return null;
    return audioContext.createGain();
  };
  const [gainNode] = useState(createGainNode());

  /**
   * create 3-band-equalizer with
   * lowShelf-, peaking-, highShelf-,
   * lowPass- and highPass filter
   */
  useEffect(() => {
    if (audioContext) {
      const low = audioContext.createBiquadFilter();
      low.type = "lowshelf";
      low.frequency.value = lowerBandThreshold;
      low.gain.value = 0.0;
      low.connect(gainNode);

      const high = audioContext.createBiquadFilter();
      high.type = "highshelf";
      high.frequency.value = higherBandThreshold;
      high.gain.value = 0.0;
      high.connect(low);

      const mid = audioContext.createBiquadFilter();
      mid.type = "peaking";
      mid.frequency.value = Math.sqrt(lowerBandThreshold * higherBandThreshold);
      mid.Q.value = mid.frequency.value / (lowerBandThreshold - higherBandThreshold);
      mid.gain.value = 0.0;
      mid.connect(high);

      const lowPassFilter = audioContext.createBiquadFilter();
      lowPassFilter.type = "lowpass";
      lowPassFilter.frequency.value = 20000;
      lowPassFilter.connect(mid);

      const highPassFilter = audioContext.createBiquadFilter();
      highPassFilter.type = "highpass";
      highPassFilter.frequency.value = 0;
      highPassFilter.connect(lowPassFilter);

      setLowShelf(low);
      setHighShelf(high);
      setMidShelf(mid);
      setLowPass(lowPassFilter);
      setHighPass(highPassFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioContext]);

  useEffect(() => {
    gainNode.connect(audioContext.destination);
  }, [audioContext.destination, gainNode]);

  /**
   * adjust volume
   */
  useEffect(() => {
    gainNode.gain.value = volume;
  }, [gainNode.gain.value, volume]);

  /**
   * adjust highShelf-filter
   */
  useEffect(() => {
    if (highShelf) {
      highShelf.gain.value = highSh;
    }
  }, [highSh]);

  /**
   * adjust midShelf-filter
   */
  useEffect(() => {
    if (midShelf) {
      midShelf.gain.value = midSh;
    }
  }, [midSh]);

  /**
   * adjust lowShelf-filter
   */
  useEffect(() => {
    if (lowShelf) {
      lowShelf.gain.value = lowSh;
    }
  }, [lowSh]);

  /**
   * adjust highPass-filter
   */
  useEffect(() => {
    if (highPass) {
      highPass.frequency.value = highPassIn;
    }
  }, [highPassIn]);

  /**
   * adjust lowPass-filter
   */
  useEffect(() => {
    if (lowPass) {
      lowPass.frequency.value = lowPassIn;
    }
  }, [lowPassIn]);

  // Stop playing and reset current position on song change
  useEffect(() => {
    if (bufferSource) bufferSource.stop();
    setStartedAt(null);
    setPausedAt(null);
  }, [audioBuffer]);

  useEffect(() => {
    if (startInSync && !startedAt) {
      const source = audioContext.createBufferSource();
      setBufferSource(source);
      source.buffer = audioBuffer;
      source.connect(gainNode);

      setStartedAt(syncDelay
        ? Date.now() + (offset * 1000) + 4
        : Date.now() + (offset * 1000));
      source.start(syncDelay ? 0.4 : 0, offset);
    } else if (!startInSync && startedAt) {
      if (bufferSource) bufferSource.stop();
      setStartedAt(null);
    }
  }, [startInSync]);

  /**
   * Play from start, from startTime or if paused resume from last position.
   * @param {number} startTime startTime of the audio file in seconds
   */
  const play = (startTime) => {
    if (startedAt && !startTime) return;
    if (startedAt) bufferSource.stop();

    const source = audioContext.createBufferSource();
    setBufferSource(source);
    source.buffer = audioBuffer;
    source.connect(highPass);

    if (startTime) {
      setStartedAt(new Date().getTime() - startTime * 1000);
      source.start(0, startTime);
      setPausedAt(null);
    } else if (pausedAt) {
      setStartedAt(Date.now() - pausedAt);
      source.start(0, pausedAt / 1000);
      setPausedAt(null);
    } else {
      setStartedAt(Date.now());
      source.start();
    }
  };

  /**
   * Pause
   */
  const pause = () => {
    if (bufferSource) bufferSource.stop();
    setPausedAt(Date.now() - startedAt);
    setStartedAt(null);
  };

  return (
    <div>
      {audioBuffer != null
        && (
          <Visualizer
            audioContext={audioContext}
            audioBuffer={audioBuffer}
            isDeckA={isDeckA}
            play={play}
            startedAt={startedAt}
            pausedAt={pausedAt}
          />
        )}
      <Wrapper>
        <Radio.Group value={selection} onChange={e => setSelection(e.target.value)}>
          <Radio.Button disabled={loop} value={1}>1</Radio.Button>
          <Radio.Button disabled={loop} value={2}>2</Radio.Button>
          <Radio.Button disabled={loop} value={4}>4</Radio.Button>
          <Radio.Button disabled={loop} value={8}>8</Radio.Button>
          <Radio.Button disabled={loop} value={16}>16</Radio.Button>
          <Radio.Button disabled={loop} value={32}>32</Radio.Button>
        </Radio.Group>
        <BeatJumper
          bufferSource={bufferSource}
          setBufferSource={setBufferSource}
          startedAt={startedAt}
          setStartedAt={setStartedAt}
          bpm={bpm}
          gainNode={gainNode}
          audioBuffer={audioBuffer}
          audioContext={audioContext}
          loop={loop}
          selection={selection}
        />
        <Looper
          loop={loop}
          setLoop={setLoop}
          bpm={bpm}
          bufferSource={bufferSource}
          setStartedAt={setStartedAt}
          startedAt={startedAt}
          selection={selection}
        />
      </Wrapper>
      <Button disabled={!ready} onClick={() => play()}>
        <PlayCircleOutlined />
      </Button>
      <Button disabled={!ready} onClick={pause}>
        <PauseCircleOutlined />
      </Button>
    </div>
  );
};

Player.propTypes = {
  audioContext: PropTypes.object.isRequired,
  audioBuffer: PropTypes.object,
  volume: PropTypes.number,
  isDeckA: PropTypes.bool.isRequired,
  highSh: PropTypes.number,
  midSh: PropTypes.number,
  lowSh: PropTypes.number,
  highPassIn: PropTypes.number,
  lowPassIn: PropTypes.number,
  ready: PropTypes.bool.isRequired,
  offset: PropTypes.number,
  startInSync: PropTypes.bool.isRequired,
  syncDelay: PropTypes.bool.isRequired,
  bpm: PropTypes.number,
};

Player.defaultProps = {
  audioBuffer: null,
  volume: 1,
  highSh: 0,
  midSh: 0,
  lowSh: 0,
  highPassIn: 0,
  lowPassIn: 20000,
  bpm: null,
  offset: null,
};

export default Player;
