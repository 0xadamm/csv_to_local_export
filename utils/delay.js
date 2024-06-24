function delay(timeInMilliseconds = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${timeInMilliseconds} milliseconds`);
    }, timeInMilliseconds);
  });
}

module.exports = delay;
