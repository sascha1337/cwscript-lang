import { CWScriptParser } from './grammar/CWScriptParser';
// import { CWScriptParserVisitor } from './grammar/CWScriptParserVisitor';
import { CWScriptLexer } from './grammar/CWScriptLexer';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import * as AST from './ast';

export function parse(source: string): AST.AST {
  let inputStream = CharStreams.fromString(source);
  let lexer = new CWScriptLexer(inputStream);
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new CWScriptParser(tokenStream);
  let tree = parser.cwsItem();
  let visitor = new AST.CWScriptASTVisitor();
  return visitor.visit(tree);
}
