/*
 * Returns an array of tokens from a string
 */
export default function tokenize(expr) {
  const tokens = [];
  let token;

  function addToken(token, type) {
    tokens.push({
      value: token,
      type: type
    });
  }

  const types = {
    1: "variable",
    2: "operators",
    3: "implication",
    4: "and",
    5: "or",
    6: "negation",
    7: "parentheses",
    8: "pleft",
    9: "pright"
  };

  // https://regex101.com/r/er25HS/
  const regex = /([a-z]|[A-Z])|((\->)|(\.)|(\+)|(\~))|((\()|(\)))/g;
  expr = expr.replace(/\s/, ""); // remove whitespaces
  let match;
  while ((match = regex.exec(expr)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    let type = "";
    const filteredTypes = match
      .map((t, k) => {
        if (t === undefined) {
          return null;
        } else {
          return k;
        }
      })
      .filter(t => t);
    addToken(match[0], types[filteredTypes[filteredTypes.length - 1]]);
  }
  return tokens;
}
