exports.generateRandomStr = strLength => {
  let chars = '_abcdefghijklmnopqrstuvwxyz1234567890_';
  chars += chars;

  let result = '';

  for (let i = 0; i < strLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
