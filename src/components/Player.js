/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

const Player = ({
  audioContext,
  audioBuffer,
  volume,
  highSh,
  midSh,
  lowSh,
  highPassIn,
  lowPassIn,
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

  const createGainNode = () => {
    if (audioContext == null) return null;
    return audioContext.createGain();
  };
  const [gainNode] = useState(createGainNode());

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

  useEffect(() => {
    gainNode.gain.value = volume;
  }, [gainNode.gain.value, volume]);

  useEffect(() => {
    if (highShelf) {
      highShelf.gain.value = highSh;
    }
  }, [highSh]);

  useEffect(() => {
    if (midShelf) {
      midShelf.gain.value = midSh;
    }
  }, [midSh]);

  useEffect(() => {
    if (lowShelf) {
      lowShelf.gain.value = lowSh;
    }
  }, [lowSh]);

  useEffect(() => {
    if (highPass) {
      highPass.frequency.value = highPassIn;
    }
  }, [highPassIn]);

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

  /**
   * Play from start or if paused resume from last position
   */
  const play = () => {
    if (startedAt) return;

    const source = audioContext.createBufferSource();
    setBufferSource(source);
    source.buffer = audioBuffer;
    source.connect(highPass);

    if (pausedAt) {
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
      <Button onClick={play}>
        <PlayCircleOutlined />
      </Button>
      <Button onClick={pause}>
        <PauseCircleOutlined />
      </Button>
    </div>
  );
};

Player.propTypes = {
  audioContext: PropTypes.object.isRequired,
  audioBuffer: PropTypes.object,
  volume: PropTypes.number,
  highSh: PropTypes.number,
  midSh: PropTypes.number,
  lowSh: PropTypes.number,
  highPassIn: PropTypes.number,
  lowPassIn: PropTypes.number,
};

Player.defaultProps = {
  audioBuffer: null,
  volume: 1,
  highSh: 0,
  midSh: 0,
  lowSh: 0,
  highPassIn: 0,
  lowPassIn: 20000,
};

export default Player;
