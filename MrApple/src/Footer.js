import Icons from './Icons';
import * as S from './css/Footer';
import Logo from './assets/footer-logo.svg';
import VerticalLogo from './css/globals/VerticalLogo';

export default function Footer() {
  return (
    <>
      <S.Grass/>
      <S.Section>
        <S.Container>
          <S.LogoWrapper>
            <VerticalLogo src={Logo} centered={true} maxWidth={200} />
          </S.LogoWrapper>

          <S.RRSSWrapper>
            <S.CopyRightCol sm={12} md={8}>
              Copyright © Modern Apples 2021 - All Rights Reserved.
            </S.CopyRightCol>
            <S.IconsCol sm={12} md={4}>
              <Icons size={40} />
            </S.IconsCol>
          </S.RRSSWrapper>
        </S.Container>
      </S.Section>
    </>
  );
}
