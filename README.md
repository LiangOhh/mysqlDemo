# 数据库

```
mysql -u root -p
```

+ 导包

```js
npm i mysql
```

实例所示表结构:

![image-20240527170628509](C:\Users\椋\AppData\Roaming\Typora\typora-user-images\image-20240527170628509.png)

+ 连接数据库

```js
//创建数据库服务
const contest = mysql.createConnection({
    host:'localhost',   // 主机名 （服务器地址）
    user:'root',    //用户名
    password:'1234',    // 密码
    database:'testdatabase',  // 写上自己要连接的数据库名字
})
// 测试是否连接成功
contest.connect((err) => {
    if (err) {
        console.error('连接失败', err.stack);
        return;
    }
    console.log('连接成功!');
});
```

+ crud

```mysql
//查询语句
SELECT * FROM student
SELECT * FROM student where name = '${name}'
//新增语句
INSERT INTO student (id, name, score) VALUES ('${id}', '${name}', ${score})
//修改语句
UPDATE student SET score = '${score}' WHERE name = '${name}'
//删除语句
DELETE FROM student WHERE name = '${name}'
```

# 具体代码实现

+ 以新增为例

  html代码块

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
     ...
  </head>
  <body>
      <form >
          <input type="text" placeholder="请输入名字" name="name">
          <input type="text" placeholder="请输入得分" name="score">
         <button class="createBtn">新增该记录</button>   
      </form>
      <script type="module" src="./index.js"></script>
  </body>
  </html>
  ```

  js代码块

  ```js
  document.querySelector('.createBtn').addEventListener('click', function (event) {
      event.preventDefault(); // 阻止表单的默认提交行为
      // let name = document.getElementsByName('name');
      // console.log(name)
      let name = document.getElementsByName('name')[0].value;
      let score = document.getElementsByName('score')[0].value;
      console.log('名字: ' + name + ', 得分: ' + score);
      fetch('http://127.0.0.1:801/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, score })
      }).then(response => response.text())
          .then(data => console.log(data))
          .catch((error) => {
              console.error('Error:', error);
          });
  });
  ```

  node服务器文件

  ```js
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
  ...
  
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
  ...
  
  app.listen(801, () => {
      console.log('801端口监听中')
  })
  ```

  