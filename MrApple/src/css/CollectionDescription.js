import styled from 'styled-components';
import { Row as BootstrapRow, Spinner as BootstrapSpinner } from 'react-bootstrap';

import { mediaPhoneHorizontalWidth } from './globals/constants';
import { Container as BaseContainer } from './globals/Container';

export const Section = styled.section`
  color: white;
`;

export const Container = styled(BaseContainer)`
  padding: 4rem 0 0;
`;

export const SectionImage = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/backgrounds/Background_Description.svg');
`;

export const SpinnerContainer = styled.div`
  text-align: center;
`;

export const Spinner = styled(BootstrapSpinner)`
  heigth: 20px;
`;

export const TrailerRow = styled(BootstrapRow)`
  z-index: 1;
  display: flex;
  padding: 8rem 0 4rem;
  position: relative;
  
  --video--width: 1296;
  --video--height: 540;

  max-width: 100%;
  overflow: hidden;
  position: relative;
  padding-bottom: calc(var(--video--height) / var(--video--width) * 100%);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    margin: 0 auto;
  }
`;

export const Row = styled(BootstrapRow)`
  z-index: 2;
  display: flex;
  justify-content: left;
  flex-direction: column;
  padding: 4rem 0;
`;

export const TextRow = styled(Row)`
  padding-bottom: 6rem;
`;

export const Title = styled.h1`
  z-index: 1;
  font-size: 36px;
  margin-bottom: 1rem;
  font-family: Brlnsdb;
`;

export const Description = styled.p`
  z-index: 1;
  font-size: 20px;
`;
