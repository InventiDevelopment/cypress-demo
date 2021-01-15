export function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    let randomTxt = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomTxt, randomTxt + 1);
  }
  return randomString;
}
