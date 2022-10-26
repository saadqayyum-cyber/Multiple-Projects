import styled from 'styled-components';
import { red } from '../globals/constants';

export const Button = styled.a`
  color: white;
  height: 2.5rem;
  cursor: pointer;
  min-width: 8rem;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border-radius: 30px;
  padding-top: 0.35rem;
  text-decoration: none;
  background-color: ${red};

  ${props => props.customMargin && `margin-left: 1rem;`}

  ${props => !props.disabled &&
    `:hover {
      color: white;
      transform: scale(1.1);
    }`
  }

  ${props => props.disabled &&
    `
    background-color: #D3D3D3;
    :hover {
      color: white;
      cursor: not-allowed;
    }
    `
  }
`;

export default Button;
