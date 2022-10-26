import styled from 'styled-components';
import { Col, Row as BootstrapRow } from 'react-bootstrap';

import { Button as GlobalButton } from './globals/Button';
import { red, black, mediaPhoneHorizontalWidth } from './globals/constants';

export const TitleRow = styled(BootstrapRow)`
  padding: 4rem 0 2rem;
  text-align: center;
`;

export const Row = styled(BootstrapRow)`
  padding-botton: 2rem;
`;

export const SimpleRow = styled(BootstrapRow)`
  display: flex;
  text-align: center;
  margin: 2rem 0;
`;

export const ScreamingRow = styled(SimpleRow)`
  color: ${red};
  margin: 6rem 0 4rem;

  p {
    margin 0;
    font-size: 20px;
  }

  h2 {
    font-size: 52px;
    font-family: Brlnsdb;
  }
`;

export const Title = styled.h1`
  color: ${black};
  font-size: 36px;
  font-family: Brlnsdb;
  text-transform: uppercase;
`;

export const Description = styled.p`
  font-size: 20px;
  font-style: italic;
`;

export const Button = styled(GlobalButton)`
  margin: auto;
  max-width: 20%;
`;

export const MemberWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const Member = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    margin-bottom: 2.5rem;
  }
`;

export const MemberName = styled.h3`
  margin 0;
  font-family: Brlnsdb;
`;

export const MemberRole = styled.div`
  margin 0;
  font-size: 20px;
  font-style: italic;
`;
