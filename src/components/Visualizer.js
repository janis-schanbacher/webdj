import React, { useEffect } from "react";
import PropTypes from "prop-types";

import WaveformData from "waveform-data";
import { StyledCanvas } from "./styles/Visualizer.styles";

const Visualizer = ({ audioContext, audioBuffer, isDeckA, play }) => {
  const draw = (waveform) => {
    const scaleY = (amplitude, height) => {
      const range = 256;
      const offset = 128;

      return height - ((amplitude + offset) * height) / range;
    };

    const canvas = document.getElementById(`canvas${isDeckA ? "A" : "B"}`);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#8ACB88";
    ctx.strokeStyle = "#8ACB88";
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
        draw(waveform);
      });
    }
  });

  const getCursorPosition = (event) => {
    const canvas = document.getElementById(`canvas${isDeckA ? "A" : "B"}`);
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const progressShare = x / canvas.clientWidth;
    const startTime = progressShare * audioBuffer.duration;
    play(startTime);
  };

  return (
    <StyledCanvas
      id={`canvas${isDeckA ? "A" : "B"}`}
      onClick={event => getCursorPosition(event)}
    />
  );
};

Visualizer.propTypes = {
  audioContext: PropTypes.object.isRequired,
  audioBuffer: PropTypes.object.isRequired,
  isDeckA: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
};

export default Visualizer;
