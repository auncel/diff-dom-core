/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
import { IDiffNode, IDiffLog, DiffType, DistinctionType } from './RenderNode/domCore';

function getNodeLocation(node: IDiffNode | undefined): string {
  const buff = [];

  while (node) {
    buff.unshift(node.location);
    node = node.parent;
  }

  return buff.join(' ');
}

// function createRectEle(rect: number[]) {
//   const $rect = document.createElement('div');
//   $rect.className = 'diff___rect';
//   $rect.style.left = `${rect[0]}px`;
//   $rect.style.top = `${rect[1]}px`;
//   $rect.style.width = `${rect[2]}px`;
//   $rect.style.height = `${rect[3]}px`;

//   return $rect;
// }

function diffStyle(node: IDiffNode): string[] {
  const styleDistinction = node.style!;
  const diffReason = [];
  const score = 10;
  // eslint-disable-next-line no-restricted-syntax
  for (const distinction of styleDistinction) {
    switch (distinction.type) {
      case DistinctionType.INEQUAL:
        diffReason.push(
          `property incorrent. [${distinction.key}] expect: ${distinction.expect}, actual: ${distinction.actual}`,
        );
        break;
      case DistinctionType.MISSING:
        diffReason.push(`missing property: ${distinction.key}`);
        break;
      case DistinctionType.EXTRA:
        diffReason.push(`extra property: ${distinction.key}`);
        break;
      default:
        // noop
    }
  }
  return diffReason;
}

/**
 * 只是位置信息的比较
 *
 * @export
 * @param {IDiffNode} root
 */
export function genDiffResult(root: IDiffNode): IDiffLog[] {
  // const framgent = document.createDocumentFragment();
  const diffLog: IDiffLog[] = [];
  const stack: IDiffNode[] = [];
  stack.push(root);

  // 非递归遍历
  while (stack.length) {
    const node = stack.pop()!;
    // diff type is rect
    if (node.type & DiffType.Rect) {
      // const $rect = createRectEle(node.rect.instance);
      // framgent.appendChild($rect);
    }

    if (node.type & DiffType.Style) {
      const logMsg: IDiffLog = {
        location: getNodeLocation(node),
        difference: diffStyle(node),
      };
      diffLog.push(logMsg);
    }

    // push children to stack
    if (node.children) {
      node.children.forEach((child: IDiffNode) => {
        child.parent = node;
        stack.push(child);
      });
    }
  }

  // document.body.appendChild(framgent);
  return diffLog;
}

