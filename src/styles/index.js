import styled, { keyframes } from "styled-components";
import { Button } from "@material-ui/core";

export const Title = styled.div`
  margin-top: 100px;
  margin-bottom: 58px;

  & > h1 {
    font-family: "Stencil Std";
    font-weight: normal;
    font-size: 44px;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 12px;
    letter-spacing: -1px;
    @media (max-width: 959.95px) {
      font-size: 25px;
      line-height: 31px;
      letter-spacing: -0.57px;
    }
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  @media (max-width: 969.95px) {
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export const Container = styled.div`
  min-height: 230px;
  width: 100%;
  max-width: 870px;
  min-width: 100%;
  padding: ${({ paddingBottom = 0, paddingRight = 30 }) =>
    `47px ${paddingRight}px ${paddingBottom}px 70px`};
  display: flex;
  flex-direction: column;
  align-items: baseline;
  background: white;
  margin-bottom: ${({ bottomgutter }) => `${bottomgutter ? "30px" : "0"}`};
  border-left: ${({ color, active }) =>
    `2px solid ${active ? color : "white"}`};
  box-shadow: -2px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 2px 2px 0 0;
  @media (max-width: 969.95px) {
    padding: 20px;
    padding: ${({ paddingRightMob = 20 }) =>
      `20px 20px 20px ${paddingRightMob}px`};
    min-height: 147px;
    width: 100%;
  }
`;

export const QuestionLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 30px;
  line-height: 26px;
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  padding-bottom: 10px;
`;

export const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 30px;
  min-width: 30px;
  height: 30px;
  cursor: default;
  background: #a1887f;
  color: white;
  font-size: 17px;
  line-height: 16px, & > span {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const BlockHeader = styled.div`
  padding-left: ${({ noMargin }) => (noMargin ? 0 : "10px")};
  font-size: 30px;
  font-weight: bold;
  line-height: 26px;
  letter-spacing: -1px;
  @media (max-width: 959.95px) {
    font-size: 21px;
    line-height: 1;
    letter-spacing: -1px;
  }
`;

const pulse = keyframes`
  to {
    box-shadow: 0 0 0 6px transparent, 0 0 0 12px rgba(227, 115, 14, 0);
  }
`;

export const PulseNumber = styled.div`
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  min-width: 30px;
  height: 30px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  border: none;
  box-shadow: 0 0 0 0 #f0f0f0, 0 0 0 0 rgba(255, 0, 0, 0.7);
  border-radius: 50%;
  v-align: middle;
  background: #ff001b;
  cursor: default;
  transform: translate3d(0, 0, 0);
  animation: ${pulse} 1.25s infinite cubic-bezier(0.66, 0.33, 0, 1);
  & > span {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const StyledButton = styled(Button)`
  font-size: 17px !important;
  line-height: 16px !important;
  min-height: 60px !important;
  min-width: 144px !important;
  text-transform: none !important;
  border-radius: 2px !important;
  color: ${({ opted, colour }) => `${opted ? "white" : colour} !important`};
  background: ${({ opted, colour }) =>
    `${opted ? colour : "white"} !important`};
  border: ${({ colour }) => `2px solid ${colour} !important`};
  box-shadow: ${({ opted }) =>
    `${opted ? "0 2px 10px 0 rgba(70, 135, 116, 0.3)" : "none"} !important`};
  &:hover,
  &:focus {
    color: white !important;
    background: ${({ colour }) => `${colour} !important`};
    box-shadow: 0 2px 10px 0 rgba(70, 135, 116, 0.3) !important;
  }
  @media (max-width: 969.95px) {
    min-height: 80px !important;
  }
  @media (max-width: 409.95px) {
    min-width: calc(50% - 8px) !important;
  }
  @media (max-width: 299.95px) {
    min-width: 100% !important;
    margin-bottom: 10px !important;
    font-size: 15px !important;
    min-height: 40px !important;
  }
`;

export const CardHeader = styled.div`
  font-family: DINOT-Bold;
  font-size: 24px;
  line-height: 22px;
  letter-spacing: -1px;

  @media (max-width: 959.95px) {
    font-size: 17px;
    line-height: 16px;
  }
`;
