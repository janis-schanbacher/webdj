import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Slider, Row, Col, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

import { Wrapper, VolumeSliderWrapper, BalanceSliderWrapper } from "./styles/Mixer.styles";

const Mixer = ({ setVolumeA, setVolumeB, ready, setReady, setStartInSync }) => {
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
        <Col span={5}>
          <VolumeSliderWrapper>
            <Slider vertical defaultValue={100} step={1} onChange={value => setGainA(value / 100)} />
          </VolumeSliderWrapper>
        </Col>
        <Col span={5}>
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
      <Button disabled={!ready} onClick={startSyncPlay}>
        <PlayCircleOutlined />
        Play in Sync
      </Button>
      <Button onClick={stopSyncPlay}>Stop</Button>
    </Wrapper>
  );
};

Mixer.propTypes = {
  setVolumeA: PropTypes.func.isRequired,
  setVolumeB: PropTypes.func.isRequired,
  setStartInSync: PropTypes.func.isRequired,
  setReady: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default Mixer;
