export type ExpressionFunction = Function;
export type ExpressionDependency = string;

export interface Expression {
  deps: ExpressionDependency[];
  func: ExpressionFunction;
  value: any;
}

export interface FormExpressions {
  [key: string]: Expression;
}
