import tokenize from "./src/tokenizer";

document.addEventListener("DOMContentLoaded", () => {
  const expr = "p->(q.r+~t)";
  const tokens = tokenize(expr);
  console.table(tokens);
});
