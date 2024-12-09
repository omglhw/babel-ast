/*
 * @Descripttion: 
 * @version: 
 * @Author: lihw02
 * @Date: 2024-12-08 21:40:57
 * @LastEditors: lihw02
 * @LastEditTime: 2024-12-08 22:03:36
 */
// ast.js，node ast 即可输出结果
const { parse } = require('acorn')
const { simple } = require('acorn-walk')
const { generate } = require('escodegen')
console.log(222)
const str = 'var foo = 42'
const ast = parse(str, {
  ecmaVersion: 6
})

simple(ast, {
  VariableDeclaration(node) {
    node.kind = 'let'
  }
})

console.log(generate(ast))