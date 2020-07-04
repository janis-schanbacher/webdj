import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Slider, Row, Col, Button, Tooltip } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import * as skins from "react-rotary-knob-skin-pack";

import {
  Wrapper,
  StyledCol,
  VolumeSliderWrapper,
  StyledSlider,
  KnobWrapper,
  BalanceSliderWrapper,
  StyledKnob,
} from "./styles/Mixer.styles";

const Mixer = ({
  setVolumeA,
  setVolumeB,
  setLowShA,
  setMidShA,
  setHighShA,
  setLowPaA,
  setHighPaA,
  setLowShB,
  setMidShB,
  setHighShB,
  setLowPaB,
  setHighPaB,
  ready,
  setReady,
  setStartInSync,
  startInSync,
  syncAvailable,
}) => {
  const [gainA, setGainA] = useState(1);
  const [gainB, setGainB] = useState(1);
  const [crossfade, setCrossfade] = useState(0);

  useEffect(() => {
    if (crossfade <= 0) {
      setVolumeA(gainA);
    } else {
      setVolumeA(gainA * (1 - crossfade));
    }
  }, [crossfade, gainA, setVolumeA]);

  useEffect(() => {
    if (crossfade >= 0) {
      setVolumeB(gainB);
    } else {
      setVolumeB(gainB * (1 + crossfade));
    }
  }, [crossfade, gainB, setVolumeB]);

  const startSyncPlay = () => {
    setReady(false);
    setStartInSync(true);
  };

  const stopSyncPlay = () => {
    setReady(true);
    setStartInSync(false);
  };

  return (
    <Wrapper>
      <Row justify="space-between">
        <StyledCol span={12}>
          <KnobWrapper>
            <StyledKnob
              defaultValue={0}
              rotateDegrees={220}
              onChange={value => setHighShA(value)}
              min={-25}
              max={25}
              skin={skins.s12}
              clampMax={280}
            />
            HIGH
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob
              defaultValue={0}
              rotateDegrees={220}
              onChange={value => setMidShA(value)}
              min={-25}
              max={25}
              skin={skins.s12}
              clampMax={280}
            />
            MID
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob
              defaultValue={0}
              rotateDegrees={220}
              onChange={value => setLowShA(value)}
              min={-25}
              max={25}
              skin={skins.s12}
              clampMax={280}
            />
            LOW
          </KnobWrapper>
          {/* <KnobWrapper>
            <StyledKnob
              defaultValue={20000}
              rotateDegrees={220}
              onChange={value => setLowPaA(value)}
              min={0}
              max={20000}
              skin={skins.s12}
              clampMax={280}
            />
            LowPass
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob
              defaultValue={0}
              rotateDegrees={220}
              onChange={value => setHighPaA(value)}
              min={0}
              max={20000}
              skin={skins.s12}
              clampMax={280}
            />
            HighPass
          </KnobWrapper> */}

          <VolumeSliderWrapper>
            <StyledSlider vertical defaultValue={100} step={1} onChange={value => setGainA(value / 100)} />
          </VolumeSliderWrapper>
        </StyledCol>
        <StyledCol span={12}>
          <KnobWrapper>
            <StyledKnob
              defaultValue={0}
              rotateDegrees={220}
              onChange={value => setHighShB(value)}
              min={-25}
              max={25}
              skin={skins.s12}
              clampMax={280}
            />
            HIGH
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob
              defaultValue={0}
              rotateDegrees={220}
              onChange={value => setMidShB(value)}
              min={-25}
              max={25}
              skin={skins.s12}
              clampMax={280}
            />
            MID
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob
              defaultValue={0}
              rotateDegrees={220}
              onChange={value => setLowShB(value)}
              min={-25}
              max={25}
              skin={skins.s12}
              clampMax={280}
            />
            LOW
          </KnobWrapper>
          {/* <KnobWrapper>
            <StyledKnob
              defaultValue={20000}
              rotateDegrees={220}
              onChange={value => setLowPaB(value)}
              min={0}
              max={20000}
              skin={skins.s12}
              clampMax={280}
            />
            LowPass
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob
              defaultValue={0}
              rotateDegrees={220}
              onChange={value => setHighPaB(value)}
              min={0}
              max={20000}
              skin={skins.s12}
              clampMax={280}
            />
            HighPass
          </KnobWrapper> */}

          <VolumeSliderWrapper>
            <StyledSlider vertical defaultValue={100} step={1} onChange={value => setGainB(value / 100)} />
          </VolumeSliderWrapper>
        </StyledCol>
        <Col span={24}>
          <BalanceSliderWrapper>
            <Slider defaultValue={0} step={0.1} min={-1} max={1} onChange={value => setCrossfade(value)} />
          </BalanceSliderWrapper>
        </Col>
      </Row>
      <BalanceSliderWrapper>
        <Tooltip title={
          ready && syncAvailable
            ? "play tracks in sync"
            : ready && !syncAvailable
              ? "no bpm match"
              : "not available"
        }
        >
          <Button style={{ width: 120 }} disabled={!ready || !syncAvailable} onClick={startSyncPlay}>
            <PlayCircleOutlined />
            Play in Sync
          </Button>
        </Tooltip>
        <Button style={{ width: 120 }} disabled={!startInSync} onClick={stopSyncPlay}>Stop</Button>
      </BalanceSliderWrapper>
    </Wrapper>
  );
};

Mixer.propTypes = {
  setVolumeA: PropTypes.func.isRequired,
  setVolumeB: PropTypes.func.isRequired,
  setHighShA: PropTypes.func.isRequired,
  setMidShA: PropTypes.func.isRequired,
  setLowShA: PropTypes.func.isRequired,
  setHighPaA: PropTypes.func.isRequired,
  setLowPaA: PropTypes.func.isRequired,
  setHighShB: PropTypes.func.isRequired,
  setMidShB: PropTypes.func.isRequired,
  setLowShB: PropTypes.func.isRequired,
  setHighPaB: PropTypes.func.isRequired,
  setLowPaB: PropTypes.func.isRequired,
  setStartInSync: PropTypes.func.isRequired,
  startInSync: PropTypes.bool.isRequired,
  setReady: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
  syncAvailable: PropTypes.bool.isRequired,
};

export default Mixer;
