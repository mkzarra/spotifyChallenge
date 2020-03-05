let paragraph = "If you want to jumpstart the process of talking to us about this role, here’s a little challenge: write a program that outputs the largest unique set of characters that can be removed from this paragraph without letting its length drop below 50."

function loopParagraph(par) {
  const cache = {};
  let max = 0;
  let maxChar = '';

  for (const char of par) {
    cache[char] = cache[char] + 1 || 1;
  }


  for (const char in cache) {
    if (cache[char] > max) {
      max = cache[char];
      maxChar = char;
    }
  }

  if (max >= 50) return [...par].filter(char => char === maxChar).join('');

  delete cache[maxChar];

  (function addSmalls(obj) {
    if (max >= 50) return obj;

    const min = Math.min(...Object.values(obj));

    for (const char in obj) {
      if (obj[char] === min) {
        max += obj[char];
        delete obj[char];

        return addSmalls(obj);
      }
    }
  })(cache);

  return [...par].filter(char => !cache[char]).join('');
}

console.log(loopParagraph(paragraph));