import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

const Player = ({ audioContext, audioBuffer, volume, lowSh, highSh }) => {
  const [bufferSource, setBufferSource] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [pausedAt, setPausedAt] = useState(null);
  const [lowShelf, setLowShelf] = useState(null);
  const [highShelf, setHighShelf] = useState(null);
  const [midShelf, setMidShelf] = useState(null);

  const createGainNode = () => {
    if (audioContext == null) return null;
    return audioContext.createGain();
  };
  const [gainNode] = useState(createGainNode());


  useEffect(() => {
    if (audioContext) {
      const low = audioContext.createBiquadFilter();
      low.type = "lowshelf";
      low.frequency.value = 300.0;
      low.gain.value = 0.0;
      low.connect(gainNode);

      const high = audioContext.createBiquadFilter();
      high.type = "highshelf";
      high.frequency.value = 2000.0;
      high.gain.value = 0.0;
      high.connect(low);

      const mid = audioContext.createBiquadFilter();
      mid.type = "peaking";
      mid.frequency.value = Math.sqrt(300 * 2000);
      mid.Q.value = mid.frequency.value / (2000 - 300);
      mid.gain.value = 0.0;
      mid.connect(high);

      setLowShelf(low);
      setHighShelf(high);
      setMidShelf(mid);
    }
  }, [audioContext]);

  useEffect(() => {
    gainNode.connect(audioContext.destination);
  }, [audioContext.destination, gainNode]);

  useEffect(() => {
    gainNode.gain.value = volume;
  }, [gainNode.gain.value, volume]);

  useEffect(() => {
    if (lowShelf) {
      lowShelf.gain.value = lowSh;
      //console.log(lowShelf.gain.value);
    }
  }, [lowSh]);

  useEffect(() => {
    if (highShelf) {
      highShelf.gain.value = highSh;
    }
  }, [highSh]);

  // Stop playing and reset current position on song change
  useEffect(() => {
    if (bufferSource) bufferSource.stop();
    setStartedAt(null);
    setPausedAt(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBuffer]);

  /**
   * Play from start or if paused resume from last position
   */
  const play = () => {
    if (startedAt) return;

    const source = audioContext.createBufferSource();
    setBufferSource(source);
    source.buffer = audioBuffer;
    source.connect(midShelf);

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
};

Player.defaultProps = {
  audioBuffer: null,
  volume: 1,
};

export default Player;