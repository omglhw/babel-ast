
/*
 * @Descripttion:  https://blog.csdn.net/qq_35484495/article/details/143065909
 * @version: 
 * @Author: lihw02
 * @Date: 2024-12-08 00:48:22
 * @LastEditors: lihw02
 * @LastEditTime: 2024-12-08 21:06:06
 */
//AST核心组件的导入/加载

// fs模块 用于操作文件的读写
const fs = require("fs");
const path = require('path')
// @babel/parser 用于将JavaScript代码转换为ast树
const parser = require("@babel/parser");
// @babel/traverse 用于遍历各个节点的函数
const traverse = require("@babel/traverse").default;
// @babel/types 节点的类型判断及构造等操作
const types = require("@babel/types");
// @babel/generator 将处理完毕的AST转换成JavaScript源代码
const generator = require("@babel/generator").default;
const currentDirectory = __dirname;
// console.log('process.cwd()', process.cwd(), __dirname, __filename, path.resolve(__filename))
// 混淆的js代码文件
const encode_file = path.join(currentDirectory, "encode.js")
// 反混淆的js代码文件
const decode_file = path.join(currentDirectory,"decode.js")
 
// 读取混淆的js文件
let jsCode = fs.readFileSync(encode_file, {encoding: "utf-8"});
// 将javascript代码转换为ast树
let ast = parser.parse(jsCode)
 
// todo 编写ast插件
const visitor = {
    enter(path){
        console.log('enter', )
        //在js代码中定位到所有标识符为a(变量名为a、函数名为a等)的节点，将其名字改为b
        if(types.isIdentifier(path.node,{"name":"a"})){
            path.node.name = "b";
        }
    },
    VariableDeclarator(path){
        //修改为数字类型
        path.node.init = types.numericLiteral(123123)
    },
    // NumericLiteral(path){
    //     //修改为字符串类型	
    //     path.replaceWith(types.valueToNode("123321"))
    // },
    NumericLiteral(path){
        console.log('NumericLiteral', )
        path.replaceWithSourceString(`function add(a,b){return a + b}`)
    }
}
 
// 调用插件,处理混淆的代码
traverse(ast,visitor)
 
// 将处理后的ast转换为js代码(反混淆后的代码)
let {code} = generator(ast);
// 保存代码
fs.writeFile(decode_file, code, (err)=>{});
