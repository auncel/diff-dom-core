# X-Diff

```rb
/* Parsing and Hashing. */
Parse DOC1 to T1 and hash T1;
Parse DOC2 to T2 and hash T2;
/* Checking and Filtering. */
If ( XHash (Root(T1)) = XHash (Root(T2)) )
  DOC1 and DOC2 are equivalent, stop.
else
  Do Matchng – Find a minimum-cost matching Mmin(T1, T2) from T1 to T2.
/* Generating minimum-cost edit script */
Do EditScript – Generate the minimum-cost edit script E from
Mmin(T1, T2).
```

Step 1 解析 & 哈希

定义 T1 T2 为待处理的 DOM 树。为每个节点计算出一个 X-Hash。这个 X-Hash 代表以这个节点为根的整棵子树。

Step 2 匹配

2.1 判断 X-Hash 是否相等。
2.2 找出所有子节点中 X-Hash 相同的节点
2.3 从叶子节点开始从下至上遍历。N1 包含 T1 中叶子节点，N2 包好 T2 中的叶子节点。比较 N1、N2 中的叶子节点的 X-Hash 值。如果相等写入 Distance Table(DT)，计算编辑距离。编辑距离为 0 代表没有任何操作，1代表更新操作。匹配结束以后，用原先叶子节点用其父节点取代。重复前面的操作直到 N1 或者 N2 为为空

```rb
Input: Tree T1 and T2.
Output: a minimum-cost matching Mmin(T1, T2).
Initialize: set initial working sets
  N1 = {all leaf nodes in T1}, N2 = {all leaf nodes in T2}.
  Set the Distance Table DT = {}.
/* Step 1: Reduce matching space */
Filter out next-level subtrees that have equal XHash values.
/* Step 2: compute editing distance for (T1 → T2) */
DO {
  For every node x in N1
  For every node y in N2
  If Signature(x) = Signature(y)
  Compute Dist(x, y);
  Save matching (x, y) with Dist(x, y) in DT.
  Set N1 = {parent nodes of previous nodes in N1};
  N2 = {parent nodes of previous nodes in N2}.
} While (both N1 and N2 are not empty).
/* Step 3: mark matchings on T1 and T2. */
Set Mmin(T1, T2) = {}
If Signature(Root(T1)) ≠ Signature(Root(T2))
  Return; /* Mmin(T1, T2) = {}*/
Else
  Add (Root(T1), Root(T2)) to Mmin(T1, T2).
  For every non-leaf node mapping (x, y) ∈ Mmin(T1, T2)
  Retrieve matchings between their child nodes that are stored in DT.
  Add child node matchings into Mmin(T1, T2).
```

Step 3 生成最少编辑脚本

```rb
Input: Tree T1 and T2, a minimum-cost matching Mmin(T1, T2), the distance table DT.
Output: an edit script E.
Initialize: set E = Null;
x = Root(T1), y = Root(T2).
If (x, y) ∉ Mmin(T1, T2) /* Subtree deletion and insertion */
  Return “Delete(T1), Insert(T2)”.
Else if Dist(T1, T2) = 0
  Return “”;
Else {
  For every node pair (xi , yj) ∈ Mmin(T1, T2), xi is a child node of x, yj is a child node of y.
  If xi and yj are leaf nodes
    If Dist(xi, yj) = 0
      Return “”;
    Else /* Update leaf node */
      Add Update(xi , Value(yj)) to E;
  Else /* Call subtree matching */
    Add EditScript(Txi, Tyj) to E;
    Return E;
  For every node xi not in Mmin(T1, T2)
    Add “Delete(Txi)” to E;
  For every node yj not in Mmin(T1, T2)
    Add “Insert(Tyj )” to E;
  Return E.
}
```

## Ref
+ <https://research.cs.wisc.edu/niagara/papers/xdiff.pdf>