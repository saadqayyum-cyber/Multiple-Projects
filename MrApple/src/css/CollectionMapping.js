import styled, { css } from 'styled-components';
import { Row, Carousel as BootstrapCarousel } from 'react-bootstrap';
import { red, mediaPhoneHorizontalWidth } from './globals/constants';

export const Section = styled.section`
  color: white;
  padding: 4rem 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/backgrounds/Background_Mapping.svg');
`;

export const TitleRow = styled(Row)`
  display: flex;
  padding-bottom: 2rem;
  h1 {
    font-size: 36px;
    font-family: Brlnsdb;
  }
`;

export const DescriptionRow = styled(Row)`
  display: flex;
  font-size: 20px;
  padding: 0 2rem;
  margin-bottom: 2rem;
  text-align: center;
  align-items: center;
`;

const carouselStyles = css`
  .carousel-indicators {
    .active {
      background-color: ${red};
    }

    button {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: inline-block;
    }
  }

  .carousel-inner {
    padding: 0 15%;

    .carousel-item {
      h3 {
        color: ${red};
        font-family: Brlnsdb;
      }

      p {
        font-size: 20px;
      }
    }
  }

  .carousel-item {
    height: 225px;
  }

  .carousel-indicators {
    display: none;
  }

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    .carousel-control-next, .carousel-control-prev {
      margin: 0 -1.5rem;
    }

    .carousel-inner {
      min-height: 450px;
    }
  }
`;

export const CarouselRow = styled(Row)`
  margin: 0 4rem;

  @media only screen and (max-width: ${mediaPhoneHorizontalWidth}) {
    margin: 0;
  }
`;

export const Carousel = styled(BootstrapCarousel)`
  ${carouselStyles}
  padding: 2rem 0;
`;
