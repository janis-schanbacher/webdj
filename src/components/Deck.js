import React from "react";
import PropTypes from "prop-types";

import SongProvider from "./SongProvider";
import SongMetadata from "./SongMetadata";
import Player from "./Player";
import { Wrapper } from "./styles/Deck.styles";

const Deck = props => (
  <Wrapper>
    <SongProvider
      audioContext={props.audioContext}
      setTrack={props.setTrack}
      setBpm={props.setBpm}
      setOffset={props.setOffset}
      setTrackMeta={props.setTrackMeta}
      setReady={props.setReady}
    >
      <SongMetadata metadata={props.metadata} />
    </SongProvider>
    {
      props.audioContext.current
      && (
        <Player
          audioContext={props.audioContext.current}
          ready={props.ready}
          audioBuffer={props.audioBuffer}
          volume={props.volume}
          offset={props.offset}
          startInSync={props.startInSync}
          setStartInSync={props.setStartInSync}
          syncDelay={props.syncDelay}
          bpm={props.bpm}
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
