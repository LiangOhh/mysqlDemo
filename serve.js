const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const { v4: uuidv4 } = require('uuid');
// 使用中间件来解析请求体中的数据
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
const contest = mysql.createConnection({
    host: '127.0.0.1',   // 主机名 （服务器地址）
    user: 'root',    //用户名
    password: '1234',    // 密码
    database: 'testdatabase',  // 写上自己要连接的数据库名字
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
    query_test, (err, results, fields) => {
        if (err) {
            console.error('无效查询', err.stack);
            return;
        } else {
            console.log('查询成功,结果如下:')
            // console.log(results);
            // 遍历输出字段
            results.forEach(item => {
                console.log(`ID: ${item.id}, Name: ${item.name}, Score: ${item.score}`);
            });
        }
    }
)

app.post('/select',(req,res)=>{
    const name = req.body.name;
    console.log('查询测试',name)
    const query = `SELECT * FROM student where name = '${name}'`
    console.log(query)
    // return
    contest.query(
        query, (err, results, fields) => {
            if (err) {
                console.error('无效查询', err.stack);
                return;
            } else {
                console.log('查询成功,结果如下:')
                // console.log(results);
                // 遍历输出字段
                results.forEach(item => {
                    console.log(`ID: ${item.id}, Name: ${item.name}, Score: ${item.score}`);
                    res.send(`ID: ${item.id}, Name: ${item.name}, Score: ${item.score}`)
                });
            }
        }
    )   
})

app.post('/create', (req, res) => {
    console.log('新增数据中...')
    const id = uuidv4();
    const name = req.body.name;
    const score = req.body.score;
    console.log('即将要插入的数据:')
    console.log(name, score);
    const query = `INSERT INTO student (id, name, score) VALUES ('${id}', '${name}', ${score})`;
    //  console.log(query)
    contest.query(query, (err, results, fields) => {
        if (err) {
            console.error('插入失败', err.stack);
            return;
        } else {
            res.send(`新学生已添加，ID: ${id}, Name: ${name}, Score: ${score}`);
            console.log('插入成功')
        }
    });
})
app.delete('/delete',(req,res)=>{
    let name = req.body.name
    console.log('删除中',name);
    const query = `DELETE FROM student WHERE name = '${name}'`;
    contest.query(query, (err, results, fields) => {
        if(err){
            console.error('无效查询', err.stack);
            return;
        } else {
            res.send(`学生 ${name} 已被删除`);
            console.log('删除成功')
        }
    });
})
app.put('/update',(req,res)=>{
    console.log('修改中')
    let name = req.body.name
    let score = req.body.score
    console.log(name,score)
    const query = `UPDATE student SET score = '${score}' WHERE name = '${name}'`;
    contest.query(query, (err, results, fields) => {
        if(err){
            console.error('无效查询', err.stack);
            return;
        } else {
            res.send(`学生 ${name} 的分数已被更新为 ${score}`);
            console.log('更新成功')
        }
    });
});

app.listen(801, () => {
    console.log('801端口监听中')
})