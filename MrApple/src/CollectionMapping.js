import * as S from './css/CollectionMapping';
import Container from './css/globals/Container';

import { useContext } from 'react';
import { ContentContext } from './contexts/contentContext';

function Carousel() {
  const { mappingBulletsContent } = useContext(ContentContext);
  const bullets = mappingBulletsContent?.sort(function (a, b) {
    return a.index - b.index;
  });

  return (
    <S.Carousel>
      {bullets.map((item, index) => {
        return (
          <S.Carousel.Item key={index}>
            <h3>{item.title}</h3>
            {item.subtitle && (
              <h5>{item.subtitle}</h5>
            )}
            <p dangerouslySetInnerHTML={{ __html: item.description }} />
          </S.Carousel.Item>
        );
      })}
    </S.Carousel>
  );
}

export default function CollectionMapping() {
  const { sectionsContent } = useContext(ContentContext);
  const descriptionContent = sectionsContent.find(section => section.index === 5)

  return (
    <S.Section>
      <Container>
        <S.TitleRow>
          <h1>{descriptionContent?.title}</h1>
        </S.TitleRow>
        <S.DescriptionRow>{descriptionContent?.description}</S.DescriptionRow>
        <S.CarouselRow>
          <Carousel />
        </S.CarouselRow>
      </Container>
    </S.Section>
  );
}
