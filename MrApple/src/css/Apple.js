import styled from 'styled-components';

import { mediaPhoneHorizontalWidth } from './globals/constants';

export const BasicApple = styled.img`
  width: 150px;
  height: 160px;
  margin: 0 0.5rem;
  border-radius: 50%;
  ${(props) => `
    margin-${props.index % 2 === 0 ? 'top' : 'bottom'}: 2rem;`}

  ${(props) => props.teamApple && 
    `@media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
      margin-bottom: 0;
    }`
  }
`


export const Apple = styled(BasicApple)`
  height: 150px;

  ${props => `
    -webkit-animation: ${props.duration}s linear 0s infinite alternate move_apple;
    animation: ${props.duration}s linear 0s infinite alternate move_apple;`
  }

  ${props => `
    @-webkit-keyframes move_apple {
      0% {
        transform: translate3d(0px, 0px, 0px);
      }
      25% {
        transform: translate3d(0px, ${props.direction}10px, 0px);
      }
      50% {
        transform: translate3d(0px, 0px, 0px);
      }
      75% {
        transform: translate3d(0px, ${props.direction}10px, 0px);
      }
      100% {
        transform: translate3d(0px, 0px, 0px);
      }
    }
    @keyframes move_apple 
    {
      0% {
        transform: translate3d(0px, 0px, 0px);
      }
      25% {
        transform: translate3d(0px, ${props.direction}10px, 0px);
      }
      50% {
        transform: translate3d(0px, 0px, 0px);
      }
      75% {
        transform: translate3d(0px, ${props.direction}10px, 0px);
      }
      100% {
        transform: translate3d(0px, 0px, 0px);
      }
    }`
  }
`;
