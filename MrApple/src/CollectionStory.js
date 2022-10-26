import { Col } from 'react-bootstrap';
import * as S from './css/CollectionStory';

import { useContext } from 'react';
import { ContentContext } from './contexts/contentContext';

export default function CollectionStory() {
  const { sectionsContent } = useContext(ContentContext);
  const descriptionContent = sectionsContent.find(section => section.index === 2)

  return (
    <S.Section>
      <S.Container>
        <S.Row>
          <Col md={12} lg={6} />
          <Col md={12} lg={6}>
            <S.ContentWrapper>
              <S.Title>{descriptionContent?.title}</S.Title>
              <S.Description>{descriptionContent?.description}</S.Description>
            </S.ContentWrapper>
          </Col>
        </S.Row>
      </S.Container>
    </S.Section>
  );
}
