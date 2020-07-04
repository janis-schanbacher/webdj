import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Progress } from "antd";
import { StyledCanvas } from "./styles/Visualizer.styles";

const Visualizer = ({ audioContext, audioBuffer, isDeckA, play, startedAt, pausedAt }) => {
  const [progress, setProgress] = useState(0);

  const drawWaveform = () => {
    const channelData = audioBuffer.getChannelData(0);
    const canvas = document.getElementById(`canvas${isDeckA ? "A" : "B"}`);
    const ctx = canvas.getContext("2d");
    const middle = canvas.height / 2;
    const { width } = canvas;
    const step = Math.ceil(channelData.length / width);
    const color = "#177ddc";
    ctx.fillStyle = color;

    for (let i = 0; i < width; i += 1) {
      let min = 1.0;
      let max = -1.0;

      // j += 250 intead of +=1 for better performance
      for (let j = 0; j < step; j += 250) {
        const datum = channelData[(i * step) + j];

        if (datum < min) {
          min = datum;
        } else if (datum > max) {
          max = datum;
        }

        ctx.fillRect(i, (1 + min) * middle, 1, Math.max(1, (max - min) * middle));
      }
    }
  };

  useEffect(() => {
    drawWaveform();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBuffer]);

  /**
   * Play from position that is specified by the click on the waveform
   * @param {*} event click event
   */
  const handleWaveformClick = (event) => {
    const canvas = document.getElementById(`canvas${isDeckA ? "A" : "B"}`);
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const progressShare = x / canvas.clientWidth;
    const startTime = progressShare * audioBuffer.duration;
    play(startTime);
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

    updateProgress();

    if (startedAt) {
      const interval = setInterval(() => {
        updateProgress();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [startedAt, pausedAt, audioBuffer]);

  return (
    <>
      <StyledCanvas
        id={`canvas${isDeckA ? "A" : "B"}`}
        onClick={event => handleWaveformClick(event)}
      />
      <Progress percent={100 * progress} showInfo={false} />
    </>
  );
};

Visualizer.propTypes = {
  audioContext: PropTypes.object.isRequired,
  audioBuffer: PropTypes.object.isRequired,
  isDeckA: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  startedAt: PropTypes.number,
  pausedAt: PropTypes.number,
};

Visualizer.defaultProps = {
  startedAt: 0,
  pausedAt: 0,
};

export default Visualizer;
