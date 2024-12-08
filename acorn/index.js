/*
 * @Descripttion: 
 * @version: 
 * @Author: lihw02
 * @Date: 2024-12-08 21:17:38
 * @LastEditors: lihw02
 * @LastEditTime: 2024-12-08 21:17:44
 */
const acorn = require("acorn");

// 示例代码
const code = `let x = 10;`;

// 解析生成AST
// ecmaVersion选项允许你指定ECMAScript的版本
const ast = acorn.parse(code, { ecmaVersion: 2020 });

console.log(JSON.stringify(ast, null, 2)); 