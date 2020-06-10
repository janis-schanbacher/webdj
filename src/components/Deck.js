import React from "react";
import PropTypes from "prop-types";

import SongProvider from "./SongProvider";
import SongMetadata from "./SongMetadata";
import Player from "./Player";
import { Wrapper } from "./styles/Deck.styles";

const Deck = ({ audioContext, audioBuffer, setTrack, metadata, setTrackMeta, volume }) => (
  <Wrapper>
    <SongProvider audioContext={audioContext} setTrack={setTrack} setTrackMeta={setTrackMeta}>
      <SongMetadata metadata={metadata} />
    </SongProvider>
    {audioContext.current && <Player audioContext={audioContext.current} audioBuffer={audioBuffer} volume={volume} />}
  </Wrapper>
);

Deck.propTypes = {
  audioContext: PropTypes.object.isRequired,
  audioBuffer: PropTypes.object,
  setTrack: PropTypes.func.isRequired,
  volume: PropTypes.number,
  metadata: PropTypes.object.isRequired,
  setTrackMeta: PropTypes.func.isRequired,
};

Deck.defaultProps = {
  audioBuffer: null,
  volume: 1,
};

export default Deck;
