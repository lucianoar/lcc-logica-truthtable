import tokenize from "./src/tokenizer";
import parse from "./src/parser";

document.addEventListener("DOMContentLoaded", () => {
  const expr = "p->(q.r+~t)";
  const tokens = tokenize(expr);
  console.log(expr)
  parse(tokens);
});
