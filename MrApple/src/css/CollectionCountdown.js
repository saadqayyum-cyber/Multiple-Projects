import styled from 'styled-components';
import { Row as BootstrapRow, Col } from 'react-bootstrap';

import { Container as BaseContainer } from './globals/Container';
import { red, mediaPhoneHorizontalWidth } from './globals/constants';

export const Section = styled.section`
  height: 465px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/backgrounds/Background_Mint.svg');
`;

export const Container = styled(BaseContainer)`
  height: 100%;
`;

export const Row = styled(BootstrapRow)`
  height: 100%;
  display: flex;
  padding: 4rem 0;
`;

export const PhantomCol = styled(Col)`
  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    display: none;
  }
`;

export const ContentWrapper = styled(Col)`
  color: white;
  display: flex;
  margin: auto 0;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-family: Brlnsdb;
  text-transform: uppercase;
  margin: ${props => props.isLaunched ? '0 0 1.5rem' : '0'};
`;

export const Description = styled.div`
  margin: 1rem 0 1.5rem;

  h4 {
    margin: 0;
    font-size: 48px;
  }

  div {
    display: flex;
    font-size: 14px;
    justify-content: space-around;
  }
`;

export const CounterDisclaimer = styled.div`
  div {
    margin: 0 0 .75rem;
  }

  div.centered {
    text-align: center;
  }

  div.bold {
    font-weight: 800;
  }
`;

export const CounterWrapper = styled.div`
  height: 50px;
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-evenly;

  h4 {
    margin: 0 1rem;
    font-size: 48px;
  }
`;

export const Counter = styled.span`
  width: 25px;
  height: 25px;
  margin: auto 0;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  background-color: ${red};

  :hover {
    color: white;
    transform: scale(1.075);
  }
`;
