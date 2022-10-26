import styled from 'styled-components';

export const VerticalLogo = styled.img`
  ${(props) => `
    ${props.centered && 'margin: auto;'}
    max-width: ${props.maxWidth}px;
  `}
`;

export default VerticalLogo;
