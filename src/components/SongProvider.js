import React from "react";
import PropTypes from "prop-types";
import * as mmb from "music-metadata-browser";

import { setupSong } from "../lib/helper/audioHelper";

const SongProvider = ({ children, audioContext, setTrack, setTrackMeta, setBpm, setOffset }) => {
  const changeTrack = (song) => {
    mmb.parseBlob(song, { native: true }).then((metadata) => {
      setTrackMeta(metadata.common);
    });
    const songUrl = window.URL.createObjectURL(song);
    setupSong(audioContext.current, songUrl).then((setup) => {
      setTrack(setup.song);
      setBpm(setup.bpm);
      setOffset(setup.offset);
    });
  };

  return (
    <div
      onDragEnter={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.stopPropagation();
        e.preventDefault();
        changeTrack(e.dataTransfer.files[0]);
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="ant-btn">
        Select Song
        <input
          id="trackAInput"
          type="file"
          accept="audio/*"
          onChange={e => (changeTrack(e.target.files[0]))}
          style={{ display: "none" }}
        />
      </label>
      {children}
    </div>

  );
};

SongProvider.propTypes = {
  children: PropTypes.any,
  audioContext: PropTypes.object.isRequired,
  setTrack: PropTypes.func.isRequired,
  setBpm: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  setTrackMeta: PropTypes.func.isRequired,
};

SongProvider.defaultProps = {
  children: null,
};

export default SongProvider;
