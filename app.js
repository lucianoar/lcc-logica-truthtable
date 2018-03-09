import tokenize, {getVars} from "./src/tokenizer";
import parse from "./src/parser";
import solve from "./src/solver";

document.addEventListener("DOMContentLoaded", () => {
  const expr = "a+b+c.d -> t";
  const tokens = tokenize(expr);
  console.table(tokens)
  console.table(parse(tokens))
  console.table(getVars(tokens))
  const solution = solve(parse(tokens), getVars(tokens))
  const table = solution.map(s => [...s.values, s.result])
  console.table(table)
});
