import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Slider, Row, Col } from "antd";
// import { Pointer, Knob, Value, Arc } from "rc-knob";
import * as skins from "react-rotary-knob-skin-pack";

import { matches } from "lodash";
import { Wrapper, VolumeSliderWrapper, KnobWrapper, BalanceSliderWrapper, StyledKnob } from "./styles/Mixer.styles";

const Mixer = ({ setVolumeA, setVolumeB, setLowShA, setMidShA, setHighShA, setLowPaA, setHighPaA, setLowShB, setMidShB, setHighShB, setLowPaB, setHighPaB }) => {
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

  /*
  <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={0.1} min={-25} max={25} onChange={value => setLowShA(value)} />
  </VolumeSliderWrapper>
  <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={0.1} min={-25} max={25} onChange={value => setMidShA(value)} />
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={0.1} min={-25} max={25} onChange={value => setHighShA(value)} />
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={20000} step={1} min={0} max={20000} onChange={value => setLowPaA(value)} />
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={1} min={0} max={20000} onChange={value => setHighPaA(value)} />
          </VolumeSliderWrapper>
  */

  return (
    <Wrapper>
      <Row justify="space-between">
        <Col span={5}>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={100} step={1} onChange={value => setGainA(value / 100)} />
          </VolumeSliderWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setLowShA(value)} min={-25} max={25} skin={skins.s11} clampMax={280} />
            Low
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setMidShA(value)} min={-25} max={25} skin={skins.s11} clampMax={280} />
            Peak
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setHighShA(value)} min={-25} max={25} skin={skins.s11} clampMax={280} />
            High
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={20000} rotateDegrees={220} onChange={value => setLowPaA(value)} min={0} max={20000} skin={skins.s11} clampMax={280} />
            LowPass
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setHighPaA(value)} min={0} max={20000} skin={skins.s11} clampMax={280} />
            HighPass
          </KnobWrapper>
          {/* oben "high" (highshelf), in der mitte "mid" (peaking), unten "low" (lowshelf). highpass, lowpass nicht benötigt */}

          {/* <VolumeSliderWrapper>
            <Knob size={100} angleOffset={220} angleRange={280} min={-25} max={25} onChange={value => setLowShA(value)}>
              <Arc arcWidth={5} color="#FC5A96" />
              <Pointer width={5} height={40} radius={10} type="rect" color="#FC5A96" />
            </Knob>
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Knob size={100} angleOffset={220} angleRange={280} min={-25} max={25} onChange={value => setMidShA(value)}>
              <Arc arcWidth={5} color="#FC5A96" />
              <Pointer width={5} height={40} radius={10} type="rect" color="#FC5A96" />
            </Knob>
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Knob size={100} angleOffset={220} angleRange={280} min={-25} max={25} onChange={value => setHighShA(value)}>
              <Arc arcWidth={5} color="#FC5A96" />
              <Pointer width={5} height={40} radius={10} type="rect" color="#FC5A96" />
            </Knob>
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={20000} step={1} min={0} max={20000} onChange={value => setLowPaA(value)} />
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={1} min={0} max={20000} onChange={value => setHighPaA(value)} />
          </VolumeSliderWrapper> */}
        </Col>
        <Col span={5}>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={100} step={1} onChange={value => setGainB(value / 100)} />
          </VolumeSliderWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setLowShB(value)} min={-25} max={25} skin={skins.s11} clampMax={280} />
            Low
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setMidShB(value)} min={-25} max={25} skin={skins.s11} clampMax={280} />
            Peak
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setHighShB(value)} min={-25} max={25} skin={skins.s11} clampMax={280} />
            High
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={20000} rotateDegrees={220} onChange={value => setLowPaB(value)} min={0} max={20000} skin={skins.s11} clampMax={280} />
            LowPass
          </KnobWrapper>
          <KnobWrapper>
            <StyledKnob defaultValue={0} rotateDegrees={220} onChange={value => setHighPaB(value)} min={0} max={20000} skin={skins.s11} clampMax={280} />
            HighPass
          </KnobWrapper>
          {/* <VolumeSliderWrapper>
            <Knob size={100} angleOffset={220} angleRange={280} min={-25} max={25} onChange={value => setLowShB(value)}>
              <Arc arcWidth={5} color="#FC5A96" />
              <Pointer width={5} height={40} radius={10} type="rect" color="#FC5A96" />
            </Knob>
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Knob size={100} angleOffset={220} angleRange={280} min={-25} max={25} onChange={value => setMidShB(value)}>
              <Arc arcWidth={5} color="#FC5A96" />
              <Pointer width={5} height={40} radius={10} type="rect" color="#FC5A96" />
            </Knob>
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Knob size={100} angleOffset={220} angleRange={280} min={-25} max={25} onChange={value => setHighShB(value)}>
              <Arc arcWidth={5} color="#FC5A96" />
              <Pointer width={5} height={40} radius={10} type="rect" color="#FC5A96" />
            </Knob>
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={20000} step={1} min={0} max={20000} onChange={value => setLowPaB(value)} />
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={1} min={0} max={20000} onChange={value => setHighPaB(value)} />
          </VolumeSliderWrapper> */}
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
};

export default Mixer;
