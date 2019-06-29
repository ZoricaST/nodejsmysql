const express = require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'stonitenis',
    database: 'nodemysql'
});
db.connect(function (err) {
    if (err) throw err;
    console.log("Mysql connected!");
});

const app = express();
//
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE mydb11";

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Db created...');
    });
});

//Create table
app.get('/createpoststable', (req, res) => {
    let sql = "CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY , title VARCHAR(255), body VARCHAR(255))";

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

//insert post1
app.get('/addpost1', (req, res) => {
    let post = { 'title': 'Post1', 'body': 'this is post number one' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post one added...');
    });
});

//insert post2
app.get('/addpost2', (req, res) => {
    let post = { 'title': 'Post2', 'body': 'this is post number two' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post two added...');
    });
});

//Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts ';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('POsts fetched...');
    });
});

//Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts ';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('POsts fetched...');
    });
});

//Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title='${newTitle}' WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Delete post
app.get('/deletepost/:id', (req, res) => {
    // let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts  WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post deleted');
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
})