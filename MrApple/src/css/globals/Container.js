import styled from 'styled-components';
import { Container as BootstrapContainer } from 'react-bootstrap';

import { mediaPhoneHorizontalWidth } from './constants';

export const Container = styled(BootstrapContainer)`
  max-width: 70%;

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    max-width: 90%;
  }
`;

export default Container;
