import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Progress } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import Visualizer from "./Visualizer";

const Player = ({ audioContext, audioBuffer, volume, isDeckA }) => {
  const [bufferSource, setBufferSource] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [pausedAt, setPausedAt] = useState(null);
  const [progress, setProgress] = useState(0);

  const createGainNode = () => {
    if (audioContext == null) return null;
    return audioContext.createGain();
  };
  const [gainNode] = useState(createGainNode());

  useEffect(() => {
    gainNode.connect(audioContext.destination);
  }, [audioContext.destination, gainNode]);

  useEffect(() => {
    gainNode.gain.value = volume;
  }, [gainNode.gain.value, volume]);

  // Stop playing and reset current position on song change
  useEffect(() => {
    if (bufferSource) bufferSource.stop();
    setStartedAt(null);
    setPausedAt(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBuffer]);

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
    source.connect(gainNode);

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

  /**
   * Update progress
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const updateProgress = () => {
      if (pausedAt) {
        setProgress(((pausedAt - startedAt) / 1000) / audioBuffer.duration);
      } else if (startedAt) {
        setProgress(((Date.now() - startedAt) / 1000) / audioBuffer.duration);
      } else {
        setProgress(0);
      }
    };

    if (startedAt) {
      const interval = setInterval(() => {
        updateProgress();
      }, 2000);
      return () => clearInterval(interval);
    } if (pausedAt) updateProgress();
  }, [startedAt, pausedAt, audioBuffer]);

  return (
    <div>
      {audioBuffer != null
      && (
        <Visualizer
          audioContext={audioContext}
          audioBuffer={audioBuffer}
          isDeckA={isDeckA}
          play={play}
          bufferSource={bufferSource}
          setBufferSource={setBufferSource}
        />
      )}
      <Progress percent={100 * progress} showInfo={false} />
      <Button onClick={() => play()}>
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
  isDeckA: PropTypes.bool.isRequired,
};

Player.defaultProps = {
  audioBuffer: null,
  volume: 1,
};

export default Player;
