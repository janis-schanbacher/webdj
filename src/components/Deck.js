import React from "react";
import PropTypes from "prop-types";

import SongProvider from "./SongProvider";
import SongMetadata from "./SongMetadata";
import Player from "./Player";
import { Wrapper } from "./styles/Deck.styles";

const Deck = ({
  audioContext,
  audioBuffer,
  setTrack,
  metadata,
  setTrackMeta,
  volume, lowShelf,
  midShelf,
  highShelf,
  lowPass,
  highPass,
}) => (
    <Wrapper>
      <SongProvider audioContext={audioContext} setTrack={setTrack} setTrackMeta={setTrackMeta}>
        <SongMetadata metadata={metadata} />
      </SongProvider>
      {
        audioContext.current
        && <Player audioContext={audioContext.current} audioBuffer={audioBuffer} volume={volume} lowSh={lowShelf} midSh={midShelf} highSh={highShelf} lowPassIn={lowPass} highPassIn={highPass} />
      }
    </Wrapper>
  );

Deck.propTypes = {
  audioContext: PropTypes.object.isRequired,
  audioBuffer: PropTypes.object,
  setTrack: PropTypes.func.isRequired,
  volume: PropTypes.number,
  metadata: PropTypes.object.isRequired,
  setTrackMeta: PropTypes.func.isRequired,
  lowShelf: PropTypes.number,
  midShelf: PropTypes.number,
  highShelf: PropTypes.number,
  lowPass: PropTypes.number,
  highPass: PropTypes.number,
};

Deck.defaultProps = {
  audioBuffer: null,
  volume: 1,
  lowShelf: 0,
  midShelf: 0,
  highShelf: 0,
  lowPass: 20000,
  highPass: 0,
};

export default Deck;
