import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import BaseContainer from './globals/Container';
import { mediaPhoneHorizontalWidth } from './globals/constants';

export const Section = styled.section`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/backgrounds/Background_Footer.svg');
`;

export const Container = styled(BaseContainer)`
  color: white;
  display: flex;
  font-size: 20px;
  flex-direction: column;
`;

export const LogoWrapper = styled.span`
  display: flex;
`;

export const RRSSWrapper = styled(Row)`
  display: flex;
  padding: 2rem 0;

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    flex-direction: column;

    .col {
      text-align: center;
    }
  }
`;

export const CopyRightCol = styled(Col)`
  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    text-align: center;
  }
`

export const IconsCol = styled(Col)`
  display: flex;
  justify-content: end;

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    margin-top: 2rem;
    justify-content: center;
  }
`;

export const Grass = styled.section`
  min-height: 8rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/backgrounds/Background_Footer_Grass.svg');
`;
