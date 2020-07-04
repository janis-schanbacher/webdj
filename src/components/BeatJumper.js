import React, { useState } from "react";
import { Button, Radio } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const BeatJumper = ({
  bufferSource,
  setBufferSource,
  startedAt,
  bpm,
  gainNode,
  setStartedAt,
  loop,
  audioBuffer,
  audioContext,
}) => {
  const [moveSelection, setMoveSelection] = useState(16);

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
        setStartedAt(startedAt - (timeToAdd * 1000));
      } else {
        source.start(0, paused / 1000 - timeToAdd);
        setStartedAt(startedAt + (timeToAdd * 1000));
      }
    }
  };

  return (
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
        <LeftCircleOutlined />
      </Button>
      <Button disabled={loop || !startedAt} onClick={() => beatJump(2)}>
        <RightCircleOutlined />
      </Button>
    </div>
  );
};

BeatJumper.propTypes = {
  bufferSource: PropTypes.object.isRequired,
  setBufferSource: PropTypes.func.isRequired,
  startedAt: PropTypes.number.isRequired,
  bpm: PropTypes.number.isRequired,
  gainNode: PropTypes.object.isRequired,
  setStartedAt: PropTypes.func.isRequired,
  loop: PropTypes.bool.isRequired,
  audioBuffer: PropTypes.object.isRequired,
  audioContext: PropTypes.object.isRequired,
};

export default BeatJumper;
