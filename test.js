const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

const contest = mysql.createConnection({
    host:'127.0.0.1',   // 主机名 （服务器地址）
    user:'root',    //用户名
    password:'1234',    // 密码
    database:'testdatabase',  // 写上自己要连接的数据库名字
})

contest.connect((err) => {
    if (err) {
        console.error('连接失败', err.stack);
        return;
    }
    console.log('连接成功!');
});
// 展示数据库指定表中的全部数据
const query_test = 'SELECT * FROM student';
contest.query(
    query_test,(err, results, fields)=>{
        if(err){
            console.error('无效查询', err.stack);
            return;
        }else{
            console.log('查询成功,结果如下:')
            // console.log(results);
            // 遍历输出字段
            results.forEach(item => {
                console.log(`ID: ${item.id}, Name: ${item.name}, Score: ${item.score}`);
            });
        }
    }
)
const query_test2 = 'SELECT * FROM student where id= 123'
contest.query(
    query_test2,(err, results, fields)=>{
        if(err){
            console.error('无效查询', err.stack);
            return;
        }else{
            console.log('查询成功,结果如下:')
            // console.log(results);
            // 遍历输出字段
            results.forEach(item => {
                console.log(`ID: ${item.id}, Name: ${item.name}, Score: ${item.score}`);
            });
        }
    }
)
app.get('/test',(req,res)=>{
    res.send('请求成功')
    console.log(1)
})
app.listen(802,()=>{
    console.log('802端口监听中')
})