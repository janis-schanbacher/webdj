import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import WaveformData from "waveform-data";
import { Progress } from "antd";
import { StyledCanvas } from "./styles/Visualizer.styles";

const Visualizer = ({ audioContext, audioBuffer, isDeckA, play, startedAt, pausedAt }) => {
  const [progress, setProgress] = useState(0);

  /**
   * Draw waveform in canvas
   * @param {WaveformData} waveform waveform to be drawn
   */
  const drawWaveform = (waveform) => {
    const scaleY = (amplitude, height) => {
      const range = 256;
      const offset = 128;

      return height - ((amplitude + offset) * height) / range;
    };

    const canvas = document.getElementById(`canvas${isDeckA ? "A" : "B"}`);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#177ddc";
    ctx.strokeStyle = "#177ddc";
    ctx.beginPath();

    const channel = waveform.channel(0);

    // Loop forwards, drawing the upper half of the waveform
    for (let x = 0; x < waveform.length; x += 1) {
      const val = channel.max_sample(x);
      ctx.lineTo(x + 0.5, scaleY(val, canvas.height) + 0.5);
    }

    // Loop backwards, drawing the lower half of the waveform
    for (let x = waveform.length - 1; x >= 0; x -= 1) {
      const val = channel.min_sample(x);

      ctx.lineTo(x + 0.5, scaleY(val, canvas.height) + 0.5);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  /**
   * Create waveform
   */
  useEffect(() => {
    if (audioContext != null && audioBuffer != null) {
      const options = {
        audio_context: audioContext,
        audio_buffer: audioBuffer,
        scale: 128,
      };

      new Promise((resolve, reject) => {
        WaveformData.createFromAudio(options, (err, waveform) => {
          if (err) {
            reject(err);
          } else {
            resolve(waveform);
          }
        });
      }).then((waveform) => {
        drawWaveform(waveform);
      });
    }
  });

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

    if (startedAt) {
      const interval = setInterval(() => {
        updateProgress();
      }, 2000);
      return () => clearInterval(interval);
    } if (pausedAt) updateProgress();
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
