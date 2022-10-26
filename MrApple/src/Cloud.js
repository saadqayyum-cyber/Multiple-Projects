import { useEffect, useState, useCallback } from 'react';
import { useMotionAnimate } from 'motion-hooks';

import * as S from './css/Cloud';
import { tabletHorizontalWidth } from './css/globals/constants';
import {
  range,
  setImage,
  setDirection,
  randomValueInRange,
} from './utils/cloudUtils';

export function Cloud({ id }) {
  const [cloudSrc] = useState(setImage());
  const [direction] = useState(setDirection());
  const [width] = useState(randomValueInRange(300, 500));
  const [verticalPosition] = useState(randomValueInRange(7, 12));

  const { play, isFinished, replay } = useMotionAnimate(
    `#cloud${id}`,
    { x: [300 * direction, -300 * direction, 300 * direction] },
    {
      duration: randomValueInRange(15, 30),
      easing: [0.22, 0.03, 0.26, 1]
    }
  );

  useEffect(() => {
    play();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isFinished) return;
    replay();
    // eslint-disable-next-line
  }, [isFinished]);

  return (
    <S.Cloud id={`cloud${id}`} src={cloudSrc} width={width} verticalPosition={verticalPosition} />
  );
}

export default function Sky() {
  const mobileMaxClouds = 3;
  const desktopMaxClouds = 5;

  const [cloudsDisplayed, setCloudsDisplayed] = useState(
    window.innerWidth < tabletHorizontalWidth ? mobileMaxClouds : desktopMaxClouds
  );

  const handleWindowResize = useCallback(event => {
    const { target: window } = event;

    if (window.innerWidth < tabletHorizontalWidth) {
      return setCloudsDisplayed(mobileMaxClouds);
    }

    if (cloudsDisplayed !== desktopMaxClouds) return setCloudsDisplayed(desktopMaxClouds);
  }, [cloudsDisplayed]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <S.Sky>
      {range(1, cloudsDisplayed).map((cloudId) => {
        return <Cloud id={cloudId} key={cloudId} />;
      })}
    </S.Sky>
  );
}
