import React from "react";
import PropTypes from "prop-types";

import SongProvider from "./SongProvider";
import SongMetadata from "./SongMetadata";
import Player from "./Player";
import { Wrapper } from "./styles/Deck.styles";

const Deck = ({ audioContext, audioBuffer, setTrack, metadata, setTrackMeta }) => (
  <Wrapper>
    <SongProvider audioContext={audioContext} setTrack={setTrack} setTrackMeta={setTrackMeta}>
      <SongMetadata metadata={metadata} />
    </SongProvider>
    <Player audioContext={audioContext.current} audioBuffer={audioBuffer} />
  </Wrapper>
);

Deck.propTypes = {
  audioContext: PropTypes.object.isRequired,
  audioBuffer: PropTypes.object,
  setTrack: PropTypes.func.isRequired,
  metadata: PropTypes.object.isRequired,
  setTrackMeta: PropTypes.func.isRequired,
};

Deck.defaultProps = {
  audioBuffer: null,
};

export default Deck;
