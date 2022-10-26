import Icons from './Icons';
import Button from './css/globals/Button';
import Logo from './assets/navbar-logo.svg';

import { useContext } from 'react';
import { BlockchainContext } from './contexts/BlockchainContext';

import * as S from './css/Navbar';

export default function NavBar() {
  const { currentSignerAddress, connectWallet } = useContext(BlockchainContext);

  let c1 = currentSignerAddress.substring(0, 5);
  let c2 = currentSignerAddress.substring(currentSignerAddress.length - 5);

  // const handleClick = (event) => {
  //   if (!isJohnLaunched()) return;
  // };

  function handleClick() {
    connectWallet();
  }

  return (
    <S.NavBar className="navbar navbar-light bg-light">
      <S.Logo src={Logo} />

      <S.RRSSWrapper>
        <Icons size={40} />
        {currentSignerAddress ? (
          <Button className="walletConnected" customMargin={true}>
            Wallet Connected {c1}....{c2}
          </Button>
        ) : (
          <Button onClick={handleClick} customMargin={true}>
            Connect
          </Button>
        )}
      </S.RRSSWrapper>
    </S.NavBar>
  );
}
