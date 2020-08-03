const mysql = require('mysql')
const express = require('express')
const bodyparser = require('body-parser') 

var app = express()
app.use(bodyparser.json())

// create mysql connection
var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password: '',
	database: 'buchat'
});

// connect the database
conn.connect((err)=>{
	if(!err)
		console.log('database connected')
	else
		console.log('database not connected')
});

// get full users
app.get('/users',(req,res)=>{
// call users table
conn.query('SELECT * FROM users',(err,rows,field)=>{
	if(!err)
		res.send(rows)
		// console.log(rows)
	else
		console.log(err)
})
});

// get specified user
app.get('/users/:id',(req,res)=>{
// call users table
conn.query('SELECT * FROM users WHERE id=?',[req.params.id],(err,rows,field)=>{
	if(!err)
		res.send(rows)
		// console.log(rows)
	else
		console.log(err)
})
});

// delete
app.delete('/users/:id',(req,res)=>{
// call users table
conn.query('DELETE FROM users WHERE id=?',[req.params.id],(err,rows,field)=>{
	if(!err)
		res.send('Done')
		// console.log(rows)
	else
		console.log(err)
})
});

// insert
app.post('/users',(req,res)=>{
// call users table
var usr = req.body;
var snd = {"is":"added"}
conn.query('INSERT INTO `users` (`id`, `name`, `email`, `username`) VALUES (NULL, ?, ?, ?)',[usr.name,usr.email,usr.username],(err,rows,field)=>{
	if(!err)
		res.send(snd)
	else
		console.log(err)
})
});
app.listen(3000,()=>console.log('Server running 3000'))