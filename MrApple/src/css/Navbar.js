import styled from 'styled-components';

import { mediaPhoneHorizontalWidth } from './globals/constants';

export const NavBar = styled.nav`
  display: flex;
  padding: 2rem 15%;
  justify-content: space-between;

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    flex-direction: column;
  }
`;

export const Logo = styled.img`
  max-width: 300px;

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    padding-bottom: 1rem;
  }
`;

export const RRSSWrapper = styled.span`
  display: flex;

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    padding-top: 1rem;
  }
`;
