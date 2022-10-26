import Discord from './assets/discord.svg';
import Twitter from './assets/twitter.svg';
import TwitterG from './assets/twitter_green.svg';
import OpenSea from './assets/opensea.svg';

import * as S from './css/Icons';

const discordURL = 'https://discord.gg/ZtAY9QnzDz';
const twitterURL = 'https://twitter.com/ModernApplesNFT';
const openSeaURL = null;

export default function Icons({ size }) {
  return (
    <>
      <a href={discordURL}>
        <S.Image size={size} src={Discord} alt="discord" />
      </a>
      <a href={twitterURL}>
        <S.Image size={size} src={Twitter} alt="twitter" />
      </a>
      {openSeaURL && (<a href={openSeaURL}>
        <S.Image size={size} src={OpenSea} alt="opensea" />{' '}
      </a>)}
    </>
  );
}

export function TwitterGreen({ size, link }) {
  return (
    <a href={link} target="__blank">
      <S.Image size={size} src={TwitterG} alt="twitter" />
    </a>
  );
}
