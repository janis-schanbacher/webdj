import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Slider, Row, Col } from "antd";
import * as skins from "react-rotary-knob-skin-pack";
import { Wrapper, VolumeSliderWrapper, KnobWrapper, BalanceSliderWrapper, StyledKnob } from "./styles/Mixer.styles";

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

  return (
    <Wrapper>
      <Row justify="space-between">
        <Col span={5}>
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
              onChange={value => setHighShA(value)}
              min={-25}
              max={25}
              skin={skins.s12}
              clampMax={280}
            />
            HIGH
          </KnobWrapper>
          {
            /*<KnobWrapper>
              <StyledKnob defaultValue={20000} rotateDegrees={220} onChange={value => setLowPaA(value)} min={0} max={20000} skin={skins.s12} clampMax={280} />
              LowPass
            </KnobWrapper>
            <KnobWrapper>
              <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setHighPaA(value)} min={0} max={20000} skin={skins.s12} clampMax={280} />
              HighPass
            </KnobWrapper>*/
          }
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={100} step={1} onChange={value => setGainA(value / 100)} />
          </VolumeSliderWrapper>
        </Col>
        <Col span={5}>
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
              onChange={value => setHighShB(value)}
              min={-25}
              max={25}
              skin={skins.s12}
              clampMax={280}
            />
            HIGH
          </KnobWrapper>
          {
            /*<KnobWrapper>
              <StyledKnob defaultValue={20000} rotateDegrees={220} onChange={value => setLowPaB(value)} min={0} max={20000} skin={skins.s12} clampMax={280} />
              LowPass
            </KnobWrapper>
            <KnobWrapper>
              <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setHighPaB(value)} min={0} max={20000} skin={skins.s12} clampMax={280} />
              HighPass
            </KnobWrapper>*/
          }
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={100} step={1} onChange={value => setGainB(value / 100)} />
          </VolumeSliderWrapper>
        </Col>
        <Col span={24}>
          <BalanceSliderWrapper>
            <Slider defaultValue={0} step={0.1} min={-1} max={1} onChange={value => setCrossfade(value)} />
          </BalanceSliderWrapper>
        </Col>
      </Row>
    </Wrapper>
  );
};

Mixer.propTypes = {
  setVolumeA: PropTypes.func.isRequired,
  setVolumeB: PropTypes.func.isRequired,
  setLowShA: PropTypes.number.isRequired,
  setMidShA: PropTypes.number.isRequired,
  setHighShA: PropTypes.number.isRequired,
  setLowPaA: PropTypes.number.isRequired,
  setHighPaA: PropTypes.number.isRequired,
  setLowShB: PropTypes.number.isRequired,
  setMidShB: PropTypes.number.isRequired,
  setHighShB: PropTypes.number.isRequired,
  setLowPaB: PropTypes.number.isRequired,
  setHighPaB: PropTypes.number.isRequired,

};

export default Mixer;
