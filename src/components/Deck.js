import React from "react";
import PropTypes from "prop-types";

import SongProvider from "./SongProvider";
import SongMetadata from "./SongMetadata";
import Player from "./Player";
import { Wrapper } from "./styles/Deck.styles";

const Deck = ({
  audioContext,
  setTrack,
  setBpm,
  setOffset,
  setTrackMeta,
  setReady,
  metadata,
  ready,
  audioBuffer,
  volume,
  offset,
  startInSync,
  setStartInSync,
  syncDelay,
  bpm,
}) => (
  <Wrapper>
    <SongProvider
      audioContext={audioContext}
      setTrack={setTrack}
      setBpm={setBpm}
      setOffset={setOffset}
      setTrackMeta={setTrackMeta}
      setReady={setReady}
    >
      <SongMetadata metadata={metadata} />
    </SongProvider>
    {
      audioContext.current
      && (
        <Player
          audioContext={audioContext.current}
          ready={ready}
          audioBuffer={audioBuffer}
          volume={volume}
          offset={offset}
          startInSync={startInSync}
          setStartInSync={setStartInSync}
          syncDelay={syncDelay}
          bpm={bpm}
        />
      )
    }
  </Wrapper>
);

Deck.propTypes = {
  audioContext: PropTypes.object.isRequired,
  audioBuffer: PropTypes.object,
  setTrack: PropTypes.func.isRequired,
  setBpm: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  volume: PropTypes.number,
  metadata: PropTypes.object.isRequired,
  setTrackMeta: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
  setReady: PropTypes.func.isRequired,
  bpm: PropTypes.number.isRequired,
  syncDelay: PropTypes.bool.isRequired,
  offset: PropTypes.number.isRequired,
  startInSync: PropTypes.bool.isRequired,
  setStartInSync: PropTypes.func.isRequired,
};

Deck.defaultProps = {
  audioBuffer: null,
  volume: 1,
};

export default Deck;
