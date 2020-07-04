import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Radio } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

const Player = ({ audioContext, audioBuffer, volume, ready, offset, startInSync, setStartInSync, syncDelay, bpm }) => {
  const [bufferSource, setBufferSource] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [pausedAt, setPausedAt] = useState(null);
  const [moveSelection, setMoveSelection] = useState(16);
  const [loopSelection, setLoopSelection] = useState(16);
  const [loopStartTime, setLoopStartTime] = useState();
  const [loop, setLoop] = useState(false);

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

      setStartedAt(syncDelay
        ? Date.now() + (offset * 1000) + 4
        : Date.now() + (offset * 1000));
      source.start(syncDelay ? 0.4 : 0, offset);
    } else if (!startInSync && startedAt) {
      if (bufferSource) bufferSource.stop();
      setStartedAt(null);
    }
  }, [startInSync]);

  useEffect(() => {
    if (loop && startedAt && bufferSource) {
      const loopTime = loopSelection * (60 / bpm);
      const current = Date.now() - startedAt;

      bufferSource.loop = true;
      bufferSource.loopStart = current / 1000;
      bufferSource.loopEnd = (current / 1000) + loopTime;
      setLoopStartTime(Date.now());
    } else if (!loop && startedAt && bufferSource) {
      const timePassed = Date.now() - loopStartTime;
      const loopTime = loopSelection * (60 / bpm) * 1000;
      setStartedAt(startedAt + (Math.floor(timePassed / loopTime) * loopTime));
      bufferSource.loop = false;
    }
  }, [loop]);

  const beatJump = (type) => {
    if (bufferSource) {
      const paused = Date.now() - startedAt;
      const timeToAdd = moveSelection * (60 / bpm);

      if (
        (type === 2 && (paused / 1000 + timeToAdd) > bufferSource.buffer.duration)
        || (type === 1 && (paused / 1000 - timeToAdd) < 0)
      ) {
        return;
      }

      bufferSource.stop();

      const source = audioContext.createBufferSource();
      setBufferSource(source);
      source.buffer = audioBuffer;
      source.connect(gainNode);

      if (type === 2) {
        source.start(0, paused / 1000 + timeToAdd);
        console.log(paused / 1000 + timeToAdd);
        setStartedAt(startedAt - (timeToAdd * 1000));
      } else {
        source.start(0, paused / 1000 - timeToAdd);
        console.log(paused / 1000 - timeToAdd);
        setStartedAt(startedAt + (timeToAdd * 1000));
      }
    }
  };

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
      <div>
        <Radio.Group value={moveSelection} onChange={e => setMoveSelection(e.target.value)}>
          <Radio.Button value={1}>1</Radio.Button>
          <Radio.Button value={2}>2</Radio.Button>
          <Radio.Button value={4}>4</Radio.Button>
          <Radio.Button value={8}>8</Radio.Button>
          <Radio.Button value={16}>16</Radio.Button>
          <Radio.Button value={32}>32</Radio.Button>
        </Radio.Group>
        <Button disabled={loop || !startedAt} onClick={() => beatJump(1)}>
          <LeftCircleOutlined/>
        </Button>
        <Button disabled={loop || !startedAt} onClick={() => beatJump(2)}>
          <RightCircleOutlined/>
        </Button>
      </div>
      <div>
        <Radio.Group value={loopSelection} onChange={e => setLoopSelection(e.target.value)}>
          <Radio.Button disabled={loop} value={1}>1</Radio.Button>
          <Radio.Button disabled={loop} value={2}>2</Radio.Button>
          <Radio.Button disabled={loop} value={4}>4</Radio.Button>
          <Radio.Button disabled={loop} value={8}>8</Radio.Button>
          <Radio.Button disabled={loop} value={16}>16</Radio.Button>
          <Radio.Button disabled={loop} value={32}>32</Radio.Button>
        </Radio.Group>
        <Button disabled={!startedAt} onClick={() => setLoop(!loop)} danger={loop}>Loop</Button>
      </div>
      <Button disabled={!ready} onClick={play}>
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
