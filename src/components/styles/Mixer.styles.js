import styled from "styled-components";
import { Knob } from "react-rotary-knob";

export const Wrapper = styled.div`
  background: #1C1C1C;
  padding: 20px 0 10px 0;
`;

export const VolumeSliderWrapper = styled.div`
  height: 150px;
`;

export const KnobWrapper = styled.div`
  height: 100px;
  width: 100px;
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
