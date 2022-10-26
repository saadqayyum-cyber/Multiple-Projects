import { useEffect, useState, useContext } from 'react';

import { Apple } from './Apple';
import * as S from './css/Collection';
import Container from './css/globals/Container';
import { phoneHorizontalWidth, phoneVerticalWidth } from './css/globals/constants';

import { ContentContext } from './contexts/contentContext';
import { fetchAppleImages } from './utils/contentfulUtils';

const MOBILE_COUNT = 8;
const TABLET_COUNT = 16;
const DESKTOP_COUNT = 30

const nApplesDisplayed = () => {
  return window.innerWidth <= phoneVerticalWidth ? MOBILE_COUNT :
    (window.innerWidth <= phoneHorizontalWidth ? TABLET_COUNT : DESKTOP_COUNT);
}

export default function Collection() {
  const { sectionsContent } = useContext(ContentContext);
  const descriptionContent = sectionsContent.find(section => section.index === 3)

  const [applesSample, setApplesSample] = useState([]);

  const applesToDisplay = nApplesDisplayed();
  const applesDisplayed = applesToDisplay === DESKTOP_COUNT ? applesSample : applesSample.slice(0, applesToDisplay);

  useEffect(() => {
    fetchAppleImages()
    .then((response) => response.json())
    .then(({ data }) => { setApplesSample(data.collectionImagesCollection.items[0].imagesCollection.items) });
  }, [])

  return (
    <S.Section>
      <Container>
        <S.Row>
          <S.PreTitle>{descriptionContent?.title}</S.PreTitle>
          <S.Title>{descriptionContent?.subtitle}</S.Title>
        </S.Row>
      </Container>

      <S.AppleContainer>
        {applesDisplayed.map((apple, index) => {
          return (
            <Apple
              index={index}
              key={`apple_${index}`}
              sourceImage={apple.url}
            />
          );
        })}
      </S.AppleContainer>
    </S.Section>
  );
}
