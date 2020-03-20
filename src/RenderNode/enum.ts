/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 12th March 2020 9:20 am                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 12th March 2020 9:20 am                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

export enum NodeType {
  ELEMENT_NODE = 1, // 一个 元素 节点，例如 <p> 和 <div>。
  /** @deprecated  */
  ATTRIBUTE_NODE, // 元素的耦合属性 。在 DOM4 规范里Node 接口将不再实现这个元素属性。
  TEXT_NODE, // Element 或者 Attr 中实际的  文字
  /** @deprecated  */
  CDATA_SECTION_NODE, // 一个 CDATASection，例如 <!CDATA[[ … ]]>。
  /** @deprecated  */
  ENTITY_REFERENCE_NODE, // 一个 XML 实体引用节点。 在 DOM4 规范里被移除。
  PROCESSING_INSTRUCTION_NODE, // 一个用于XML文档的 ProcessingInstruction ，例如 <?xml-stylesheet ... ?> 声明。
  /** @deprecated  */
  ENTITY_NODE, // 一个 XML <!ENTITY ...>  节点。 在 DOM4 规范中被移除。
  COMMENT_NODE, // 一个 Comment 节点。
  DOCUMENT_NODE, // 一个 Document 节点。
  DOCUMENT_TYPE_NODE, // 描述文档类型的 DocumentType 节点。例如 <!DOCTYPE html>  就是用于 HTML5 的。
  DOCUMENT_FRAGMENT_NODE, // 一个 DocumentFragment 节点
  /** @deprecated  */
  NOTATION_NODE, // 一个 XML <!NOTATION ...> 节点。 在 DOM4 规范里被移除.
}
