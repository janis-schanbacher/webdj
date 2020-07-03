import styled from "styled-components";
import { Knob } from "react-rotary-knob";
import { Col, Slider } from "antd";

export const Wrapper = styled.div`
  background: #141414;
  padding: 20px 0 10px 0;
`;

export const StyledCol = styled(Col)`
justify-content: center;
`;

export const VolumeSliderWrapper = styled.div`
  width: 12px;
  height: 150px;
  width: 100%;
`;

export const StyledSlider = styled(Slider)`
  margin: 0 auto;
`;

export const KnobWrapper = styled.div`
  height: 100px;
  text-align: center;
`;

export const StyledKnob = styled(Knob)`
  margin: 0 auto;
`;

export const BalanceSliderWrapper = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 120px;
`;
