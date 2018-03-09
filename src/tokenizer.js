// Operator precedence is key
export const types = {
  1: "variable",
  2: "operators",
  3: "and",
  4: "or",
  5: "negation",
  6: "implication",
  7: "parentheses",
  8: "pleft",
  9: "pright"
};

/*
 * returns an array with unique variables
 */
export function getVars(tokens) {
  const vars = [];
  const dict = new Set();
  tokens.forEach(t => {
    if (types[t.type] !== "variable") return;
    dict.add(t.value);
  });
  return [...dict];
}

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

  // https://regex101.com/r/er25HS/
  const regex = /([a-z]|[A-Z])|((\.)|(\+)|(\~)|(\->))|((\()|(\)))/g;
  expr = expr.replace(/\s/, ""); // remove whitespaces
  let match;
  while ((match = regex.exec(expr)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    let type = "";
    let types = match
      .map((t, k) => {
        if (t === undefined) {
          return null;
        } else {
          return k;
        }
      })
      .filter(t => t);
    addToken(match[0], types[types.length - 1]);
  }
  return tokens;
}
