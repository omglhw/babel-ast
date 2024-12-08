/*
 * @Descripttion: 
 * @version: 
 * @Author: lihw02
 * @Date: 2024-12-07 22:39:13
 * @LastEditors: lihw02
 * @LastEditTime: 2024-12-07 22:54:27
 */
// @babel/parser : 将 js 代码 ---> AST 抽象语法树
// @babel/traverse 对 AST 节点进行递归遍历；
// @babel/types 对具体的 AST 节点进行进行修改；
// @babel/generator : AST 抽象语法树 ---> 新的 js 代码；
console.log('222', 222)
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

function compile(code) {
  // 1.parse 将代码解析为抽象语法树（AST）
  const ast = parser.parse(code);

  // 2,traverse 转换代码
  traverse.default(ast, {});

  // 3. generator 将 AST 转回成代码
  return generator.default(ast, {}, code);
}

const code = `
function getData() {
  console.log("data")
}
`;

const newCode = compile(code)

console.log('newCode', newCode)