import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Radio } from "antd";

const Looper = ({ loop, setLoop, startedAt, setStartedAt, bufferSource, bpm }) => {
  const [loopSelection, setLoopSelection] = useState(16);
  const [loopStartTime, setLoopStartTime] = useState();

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

  return (
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
  );
};

Looper.propTypes = {
  loop: PropTypes.bool.isRequired,
  setLoop: PropTypes.func.isRequired,
  startedAt: PropTypes.number.isRequired,
  setStartedAt: PropTypes.func.isRequired,
  bufferSource: PropTypes.object.isRequired,
  bpm: PropTypes.number.isRequired,
};

export default Looper;
