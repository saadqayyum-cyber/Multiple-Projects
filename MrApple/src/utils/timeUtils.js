const LAUNCH_DATE = '02/08/2022';

const timeToLaunch = () => {
  return +new Date(LAUNCH_DATE) - +new Date();
};

export const isJohnLaunched = () => {
  return timeToLaunch() < 0;
};

export const calculateTimeLeft = () => {
  let timeLeft = {};
  let difference = timeToLaunch();

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60)
    };
  }

  return timeLeft;
};

export const formatTime = (time) => {
  let stringifiedTime = String(time);
  if (stringifiedTime.length < 2) return `0${stringifiedTime}`;

  return stringifiedTime;
};

export const formatTimeLeft = (timeLeft) => {
  if (!timeLeft) return '00:00:00';

  const daysLeft = formatTime(timeLeft.days);
  const hoursLeft = formatTime(timeLeft.hours);
  const minutesLeft = formatTime(timeLeft.minutes);
  return `${daysLeft}:${hoursLeft}:${minutesLeft}`;
};
