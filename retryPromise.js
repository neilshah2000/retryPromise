// allows you to call a promise recursively
// with a max number of attempts (attemptsLeft)
// will retry until the promise succeeds
// or until max attempts is reached, in which case it will reject
const retryPromise = (myProm, attemptsLeft) => {
  const newAttemptsLeft = attemptsLeft - 1;
  return new Promise((resolve, reject) => {
    console.log(`attempt ${attemptsLeft} to call ${myProm.name}`);
    myProm().then(
      successData => {
        console.log(`attempt ${attemptsLeft} success`);
        resolve(successData);
      },
      failureData => {
        console.log(`attempt ${attemptsLeft} failure`);
        if (newAttemptsLeft < 1) {
          reject(failureData);
        } else {
          return retryPromise(myProm, newAttemptsLeft).then(resolve, reject);
        }
      },
    );
  });
};
