import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

const Looper = ({ loop, setLoop, startedAt, setStartedAt, bufferSource, bpm, selection }) => {
  const [loopStartTime, setLoopStartTime] = useState();

  useEffect(() => {
    if (loop && startedAt && bufferSource) {
      const loopTime = selection * (60 / bpm);
      const current = Date.now() - startedAt;

      bufferSource.loop = true;
      bufferSource.loopStart = current / 1000;
      bufferSource.loopEnd = (current / 1000) + loopTime;
      setLoopStartTime(Date.now());
    } else if (!loop && startedAt && bufferSource) {
      const timePassed = Date.now() - loopStartTime;
      const loopTime = selection * (60 / bpm) * 1000;
      setStartedAt(startedAt + (Math.floor(timePassed / loopTime) * loopTime));
      bufferSource.loop = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop]);

  return (
    <Button disabled={!startedAt} onClick={() => setLoop(!loop)} danger={loop}>Loop</Button>
  );
};

Looper.propTypes = {
  loop: PropTypes.bool.isRequired,
  setLoop: PropTypes.func.isRequired,
  startedAt: PropTypes.number,
  setStartedAt: PropTypes.func.isRequired,
  bufferSource: PropTypes.object,
  bpm: PropTypes.number,
  selection: PropTypes.number.isRequired,
};

Looper.defaultProps = {
  startedAt: null,
  bpm: null,
  bufferSource: null,
};

export default Looper;
