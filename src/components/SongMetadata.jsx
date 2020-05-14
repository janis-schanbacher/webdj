import React from "react";
import PropTypes from "prop-types";

const SongMetadata = ({ metadata }) => (
  <div>
    [Cover]
    <h2>{metadata.title}</h2>
    {metadata.artist}<br />
    {metadata.bpm}bpm
  </div>
);

SongMetadata.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default SongMetadata;
