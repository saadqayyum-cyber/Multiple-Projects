import styled from 'styled-components';
import { Row as BootstrapRow } from 'react-bootstrap';

export const Section = styled.section``;

export const Row = styled(BootstrapRow)`
  display: flex;
  padding: 4rem 0;
  flex-direction: column;
`;

export const PreTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-family: Brlnsdb;
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 0;
  font-family: Brlnsdb;
  text-transform: uppercase;
`;

export const AppleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4rem;
  justify-content: space-around;
`;
