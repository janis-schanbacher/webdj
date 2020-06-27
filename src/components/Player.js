import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

const Player = ({ audioContext, audioBuffer, volume, ready, offset, startInSync, setStartInSync }) => {
  const [bufferSource, setBufferSource] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [pausedAt, setPausedAt] = useState(null);
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

  useEffect(() => {
    if (startInSync && !pausedAt && !startedAt) {
      const source = audioContext.createBufferSource();
      setBufferSource(source);
      source.buffer = audioBuffer;
      source.connect(gainNode);

      setStartedAt(offset);
      source.start(0, offset);
    }
  }, [startInSync]);

  /**
   * Play from start or if paused resume from last position
   */
  const play = () => {
    if (startedAt) return;

    const source = audioContext.createBufferSource();
    setBufferSource(source);
    source.buffer = audioBuffer;
    source.connect(gainNode);

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
      <Button disabled={!ready} onClick={play}>
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
  ready: PropTypes.bool.isRequired,
  offset: PropTypes.number,
  startInSync: PropTypes.bool,
  setStartInSync: PropTypes.func,
};

Player.defaultProps = {
  audioBuffer: null,
  volume: 1,
};

export default Player;
