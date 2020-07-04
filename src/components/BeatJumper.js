import React from "react";
import { Button } from "antd";
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
  selection,
}) => {

  const beatJump = (type) => {
    if (bufferSource) {
      const paused = Date.now() - startedAt;
      const timeToAdd = selection * (60 / bpm);

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
  bufferSource: PropTypes.object,
  setBufferSource: PropTypes.func.isRequired,
  startedAt: PropTypes.number,
  bpm: PropTypes.number,
  gainNode: PropTypes.object.isRequired,
  setStartedAt: PropTypes.func.isRequired,
  loop: PropTypes.bool.isRequired,
  audioBuffer: PropTypes.object,
  audioContext: PropTypes.object.isRequired,
  selection: PropTypes.number.isRequired,
};

BeatJumper.defaultProps = {
  audioBuffer: null,
  bufferSource: null,
  bpm: null,
  startedAt: null,
};

export default BeatJumper;
