import { ID_SCORE } from "../const";
import { IDistinctionDetail } from "../../../DiffTree/DiffNode";


export function evaluateIdSimlarity(
  idDistinctionds: IDistinctionDetail<string>, logs: string[],
): number {
  logs.push(
    `incorent id. expect ${idDistinctionds.expect}, actual ${idDistinctionds.actual}`,
  );
  return ID_SCORE;
}
