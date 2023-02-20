const checkNotaNumber = (value) => {
  const splits = value.split("");
  let dotCount = 0;
  for (let i = 0; i < splits.length; i++) {
    if (splits[i] === ".") {
      if (dotCount === 1) {
        return true;
      }
      dotCount++;
      continue;
    }
    if (isNaN(2 / splits[i])) return true;
  }
  return false;
};

export default checkNotaNumber;
