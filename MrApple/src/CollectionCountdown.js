import { useEffect, useState, useContext } from 'react';
import Loader from './Loader';

import Button from './css/globals/Button';
import * as S from './css/CollectionCountdown';

import { calculateTimeLeft, isJohnLaunched, formatTimeLeft } from './utils/timeUtils';

import { BlockchainContext } from './contexts/BlockchainContext';

export default function CollectionCountdown() {
  const { mint, isLoading } = useContext(BlockchainContext);
  const [count, setCount] = useState(1);
  /** TODO: Remove this commented block once there's a release date
   * const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
   * const [isLaunched, setIsLaunched] = useState(isJohnLaunched()); */
  const [isLaunched, setIsLaunched] = useState(true);
  const [isCounterDisplayed, setIsCounterDisplayed] = useState(true); // Marked True

  /** TODO: Remove this commented block once there's a release date
  // eslint-disable-next-line
  useEffect(() => {
    if (isLaunched) return;

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    setIsLaunched(isJohnLaunched());

    return () => clearTimeout(timer);
  });
  */

  const handleIncrease = () => {
    if (count >= 3) return;
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };

  const handleClick = () => {
    // if (!isLaunched) return;
    // if (!isCounterDisplayed) return setIsCounterDisplayed(true);
    // Handle Mint

    mint({ amount: count });
  };

  const getTitleContent = () => {
    if (!isLaunched) {
      return "Don't Miss It";
    } else {
      return isCounterDisplayed ? 'How Many?' : 'Mint Now!';
    }
  };

  const getButtonContent = () => {
    if (isCounterDisplayed) return 'Buy';
    return 'Mint';
  };

  const countdownSectionContent = () => {
    return (
      <S.Description>
        {/** TODO: Remove this commented block once there's a release date
        <h4>{formatTimeLeft(timeLeft)}</h4>
        <div>
          <span>DAYS</span>
          <span>HOURS</span>
          <span>MINS</span>
        </div>   */}
        <h4>Minting Soon</h4>
      </S.Description>
    );
  };

  const counterSectionContent = () => {
    return (
      <>
        <S.CounterDisclaimer>
          <div className="bold">
            11.111 MODERN APPLES <br /> AT 0.0055 ETHER EACH ONE
          </div>
          <div className="centered">EXCLUDING GAS FEES.</div>
        </S.CounterDisclaimer>
        <S.CounterWrapper>
          <S.Counter onClick={handleDecrease}>
            <b>-</b>
          </S.Counter>
          <span>
            <h4>{count}</h4>
          </span>
          <S.Counter onClick={handleIncrease}>
            <b>+</b>
          </S.Counter>
        </S.CounterWrapper>
      </>
    );
  };

  return (
    <S.Section>
      <S.Container>
        <S.Row>
          <S.PhantomCol lg={8} />

          <S.ContentWrapper lg={4} md={12} sm={12}>
            {!isCounterDisplayed && <S.Title isLaunched={isLaunched}>{getTitleContent()}</S.Title>}

            {!isLaunched && countdownSectionContent()}

            {isCounterDisplayed && counterSectionContent()}

            {isLoading ? <Loader /> : <Button onClick={handleClick}>{getButtonContent()}</Button>}
          </S.ContentWrapper>
        </S.Row>
      </S.Container>
    </S.Section>
  );
}
