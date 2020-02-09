exports.generateRandomStr = strLength => {
  let chars = 'abcdef-ghijklm-nopqrs-tuvwxyz-123456-7890';
  chars += chars;

  let result = '';

  for (let i = 0; i < strLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result.toLocaleLowerCase();
};
