

document.querySelector(".btn_select").addEventListener("click", function () {
    event.preventDefault()
    let name = document.getElementsByName('select_name')[0].value
    console.log(name)
    fetch('http://127.0.0.1:801/select', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    }).then(response => response.text())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
})
document.querySelector(".btn_delete").addEventListener("click", function () {
    event.preventDefault()
    let name = document.getElementsByName('delete_name')[0].value
    console.log(name)
    fetch('http://127.0.0.1:801/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    }).then(response => response.text())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
})


document.querySelector('.createBtn').addEventListener('click', function (event) {
    event.preventDefault(); // 阻止表单的默认提交行为
    // let name = document.querySelector('input[name="name"]').value;
    // let score = document.querySelector('input[name="score"]').value;
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

document.querySelector('.btn_update').addEventListener('click',()=>{
    event.preventDefault()
    let name = document.getElementsByName('update_name')[0].value
    let score = document.getElementsByName('update_score')[0].value
    console.log(name,score)
    fetch('http://127.0.0.1:801/update',{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({name,score})
    }).then(
        response=>response.text()
    ).then(data=>console.log(data))
    .catch((error)=>{
        console.log(error)
    })
})
