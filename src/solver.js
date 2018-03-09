import { types } from "./tokenizer";
export default function solve(expr, vars) {
  const rows = Math.pow(2, vars.length) - 1;
  const results = [];
  for (let i = 0; i <= rows; i++) {
    const binary = (i >>> 0).toString(2).split("");
    while (binary.length < vars.length) {
      binary.unshift("0");
    }

    let stack = [];
    let aux;
    expr.forEach(t => {
      switch (types[t.type]) {
        case "variable":
          stack.push(binary[vars.indexOf(t.value)] === "1" ? true : false);
          break;
        case "and":
          aux = stack.pop();
          stack.push(stack.pop() && aux);
          break;
        case "or":
          aux = stack.pop();
          stack.push(stack.pop() || aux);
          break;
        case "implication":
          aux = stack.pop();
          stack.push(!stack.pop() || aux);
          break;
        case "negation":
          stack.push(!stack.pop());
      }
    });
    results.push({ values: binary, result: stack[0] });
  }

  return results;
}
