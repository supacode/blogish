exports.generateRandomStr = strLength => {
  let chars = 'abcdef_ghijklm_nopqrs_tuvwxyz_123456_7890';
  chars += chars;

  let result = '';

  for (let i = 0; i < strLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
