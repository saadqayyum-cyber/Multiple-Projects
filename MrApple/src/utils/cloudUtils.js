import Cloud1 from '../assets/cloud1.svg';
import Cloud2 from '../assets/cloud2.svg';
import Cloud3 from '../assets/cloud3.svg';
import Cloud4 from '../assets/cloud4.svg';

export const randomValueInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const setDirection = () => {
  // return ['left', 'right'][Math.floor(2 * Math.random())];
  return [1, -1][Math.floor(2 * Math.random())];
};

export const setImage = () => {
  return [Cloud1, Cloud2, Cloud3, Cloud4][Math.floor(4 * Math.random())];
};

export const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i);
}
