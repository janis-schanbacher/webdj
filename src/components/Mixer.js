import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Slider, Row, Col } from "antd";

import { Wrapper, VolumeSliderWrapper, BalanceSliderWrapper } from "./styles/Mixer.styles";
import { matches } from "lodash";

const Mixer = ({ setVolumeA, setVolumeB, setLowShA, setHighShA, setLowShB, setHighShB }) => {
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
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={100} step={1} onChange={value => setGainA(value / 100)} />
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={0.1} min={-25} max={25} onChange={value => setLowShA(value)} />
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={0.1} min={-25} max={25} onChange={value => setHighShA(value)} />
          </VolumeSliderWrapper>
        </Col>
        <Col span={5}>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={100} step={1} onChange={value => setGainB(value / 100)} />
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={0.1} min={-25} max={25} onChange={value => setLowShB(value)} />
          </VolumeSliderWrapper>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={0} step={0.1} min={-25} max={25} onChange={value => setHighShB(value)} />
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
};

export default Mixer;
