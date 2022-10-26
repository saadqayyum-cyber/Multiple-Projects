import { useState, useContext } from 'react';
import { Col } from 'react-bootstrap';

import * as S from './css/CollectionDescription';

import Logo from './assets/footer-logo.svg';
import VerticalLogo from './css/globals/VerticalLogo';
import { ContentContext } from './contexts/contentContext';

function Trailer() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <S.TrailerRow>
      <Col sm={12}>
        {!iframeLoaded && (
          <S.SpinnerContainer>
            <S.Spinner animation="border" variant="light" />
          </S.SpinnerContainer>
        )}

        <iframe
          width="100%"
          height="500px"
          frameBorder="50"
          onLoad={() => {
            setIframeLoaded(true);
          }}
          title="Modern Apples Teaser Trailer"
          allow="autoplay; fullscreen; picture-in-picture"
          src="https://www.youtube.com/embed/QBg0IVc34hQ"
          allowFullScreen
        ></iframe>
      </Col>
    </S.TrailerRow>
  );
}

export default function CollectionDescription() {
  const { sectionsContent } = useContext(ContentContext);
  const descriptionContent = sectionsContent.find(section => section.index === 1)

  return (
    <S.Section>
      <S.SectionImage>
        <S.Container>
          <Trailer />

          <S.Row>
            <Col lg={5}>
              <VerticalLogo src={Logo} />
            </Col>
            <Col lg={7} />
          </S.Row>

          <S.TextRow>
            <Col lg={9} md={12}>
              <S.Title>{descriptionContent?.title}</S.Title>
              <S.Title>{descriptionContent?.subtitle}</S.Title>
              <S.Description dangerouslySetInnerHTML={{ __html: descriptionContent?.description }}/>
            </Col>

            <Col lg={3} md={0} />
          </S.TextRow>
        </S.Container>
      </S.SectionImage>
    </S.Section>
  );
}
