import styled from 'styled-components';
import { mediaTabletHorizontalWidth } from './globals/constants';

export const Cloud = styled.img`
  ${(props) => `
    width: ${props.width}px;
    margin-top: ${props.verticalPosition}rem;`}

  position: relative;

  @media only screen and (max-width: ${mediaTabletHorizontalWidth}) {
    margin-top: 1rem;
  }
`;

export const Sky = styled.div`
  z-index: 0;
  position: absolute;
`;
