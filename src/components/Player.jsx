import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Player = ({ audioContext, audioBuffer }) => {
  const [bufferSource, setBufferSource] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [pausedAt, setPausedAt] = useState(null);

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
    source.connect(audioContext.destination);

    if (pausedAt) {
      setStartedAt(Date.now() - pausedAt);
      source.start(0, pausedAt / 1000);
      setPausedAt(null);
      console.log("started");
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
      <button type="button" onClick={play}>Play</button>
      <button type="button" onClick={pause}>Pause</button>
    </div>
  );
};

Player.propTypes = {
  audioContext: PropTypes.object,
  audioBuffer: PropTypes.object,
};

Player.defaultProps = {
  audioContext: null,
  audioBuffer: null,
};

export default Player;
