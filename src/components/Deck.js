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
  volume,
  isDeckA,
  highShelf,
  midShelf,
  lowShelf,
  highPass,
  lowPass,
}) => (
  <Wrapper>
    <SongProvider audioContext={audioContext} setTrack={setTrack} setTrackMeta={setTrackMeta}>
      <SongMetadata metadata={metadata} />
    </SongProvider>
    {audioContext.current
        && (
          <Player
            audioContext={audioContext.current}
            audioBuffer={audioBuffer}
            volume={volume}
            isDeckA={isDeckA}
            highSh={highShelf}
            midSh={midShelf}
            lowSh={lowShelf}
            highPassIn={highPass}
            lowPassIn={lowPass}
          />
        )}
  </Wrapper>
);

Deck.propTypes = {
  audioContext: PropTypes.object.isRequired,
  audioBuffer: PropTypes.object,
  setTrack: PropTypes.func.isRequired,
  volume: PropTypes.number,
  metadata: PropTypes.object.isRequired,
  setTrackMeta: PropTypes.func.isRequired,
  isDeckA: PropTypes.bool.isRequired,
  highShelf: PropTypes.number,
  midShelf: PropTypes.number,
  lowShelf: PropTypes.number,
  highPass: PropTypes.number,
  lowPass: PropTypes.number,
};

Deck.defaultProps = {
  audioBuffer: null,
  volume: 1,
  highShelf: 0,
  midShelf: 0,
  lowShelf: 0,
  highPass: 0,
  lowPass: 20000,
};

export default Deck;
