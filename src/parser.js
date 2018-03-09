import { types } from "./tokenizer";

/*
 * Returns the postfix notation of the expresion
 */
export default function parse(tokens) {
  const exprStack = [];
  const auxStack = [];

  tokens.forEach((t, k) => {
    let prev = auxStack[auxStack.length - 1];
    switch (types[t.type]) {
      case "variable":
        exprStack.push(t);
        while (prev && types[prev.type] === "negation") {
          exprStack.push(auxStack.pop());
          prev = auxStack[auxStack.length - 1];
        }
        break;

      case "pleft":
      case "negation":
        auxStack.push(t);
        break;

      case "pright":
        if (prev.value !== "(") exprStack.push(auxStack.pop());
        auxStack.pop(); // Clean ( pleft
        break;

      case "and":
      case "or":
      case "implication":
        if (prev && prev.type < t.type) {
          exprStack.push(auxStack.pop());
        }
        auxStack.push(t);
        break;
    }
  });

  while (auxStack.length) {
    exprStack.push(auxStack.pop());
  }

  return exprStack;
}
