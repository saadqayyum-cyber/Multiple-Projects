import styled from 'styled-components';
import { Row as BootstrapRow } from 'react-bootstrap';
import { Container as BaseContainer} from './globals/Container';

// Set to min-height: 465px; for mobile
export const Section = styled.section`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/backgrounds/Background_Story.svg');
`;

export const Container = styled(BaseContainer)`
  display: flex;
  min-height: 550px;
`;

// Remove margin: auto 0; statement if they don't want the text vertically centered!
export const Row = styled(BootstrapRow)`
  margin: auto 0;
  padding: 4rem 0;
`;

export const ContentWrapper = styled.div`
  color: white;
  display: flex;
  align-items: end;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 36px;
  margin-bottom: 1rem;
  font-family: Brlnsdb;
  text-transform: uppercase;
`;

export const Description = styled.p`
  font-size: 20px;
`;
