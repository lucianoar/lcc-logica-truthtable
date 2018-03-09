function tokenize(expr) {
  const tokens = [];
  let token;

  function addToken(token, type) {
    tokens.push({
      value: token,
      type: type,
    });
  }

  types = {
    1: 'variable',
    2: 'operators',
    3: 'implication',
    4: 'and',
    5: 'or',
    6: 'negation',
    7: 'parentheses',
    8: 'pleft',
    9: 'pright',
  };

  // https://regex101.com/r/er25HS/
  const regex = /([a-z]|[A-Z])|((\->)|(\.)|(\+)|(\~))|((\()|(\)))/g;
  expr = expr.replace(/\s/, ''); // remove whitespaces
  while ((m = regex.exec(expr)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    let type = '';
    a = m
      .map((t, k) => {
        if (t === undefined) {
          return null;
        } else {
          return k;
        }
      })
      .filter(t => t);
    addToken(m[0], types[a[a.length - 1]]);
  }
  return tokens;
}

document.addEventListener('DOMContentLoaded', () => {
  const expr = 'p->(q.r +~t)';
  const tokens = tokenize(expr);
  console.table(tokens);
});
