import { CLASS_SCORE } from "../const";
import { IDistinctionDetail } from "../../../DiffTree/DiffNode";


export function evaluateClassNameSimlarity(
  classNameDistinctionds: IDistinctionDetail<string>, logs: string[],
): number {
  logs.push(
    `incorent id. expect ${classNameDistinctionds.expect}, actual ${classNameDistinctionds.actual}`,
  );
  return CLASS_SCORE;
}
