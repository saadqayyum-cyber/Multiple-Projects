import * as S from './css/Apple';

export function Apple({ sourceImage, index }) {
  const duration = 3;
  // Sames as 1 and -1. Up or down
  const direction = index % 2 === 0 ? '' : '-';

  return (
    <S.Apple
      src={sourceImage}
      duration={duration}
      direction={direction}
    />
  );
}

export function BasicApple({ sourceImage, teamApple }) {
  return <S.BasicApple src={sourceImage} teamApple={teamApple} />;
}
