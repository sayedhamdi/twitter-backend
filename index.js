const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {Post }= require("./schema/Post") 
const {user,password} = process.env
const uri = `mongodb+srv://${user}:${password}@cluster0.8o1xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

//connection to the db
mongoose
.connect(uri)
.then(()=>{
	console.log("connected to db")
})
.catch(err => console.log(err));


//middle ware
app.use(express.json())
const port = 8000
let posts = [
	{id:1,title:"post from the news",body:"this is a post that talks about nodejs"},
	{id:2,title:"post from the news",body:"this is a post that talks about nodejs"},
	{id:3,title:"post from the news",body:"this is a post that talks about nodejs"},
	{id:4,title:"post from the news",body:"this is a post that talks about nodejs"},
	{id:5,title:"post from the news",body:"this is a post that talks about nodejs"}
]

app.get("/",(req,res)=>{
	res.end("welcome")
})
app.get("/posts",(req,res)=>{
	Post.find().then(posts=>{
		res.json(posts)
	})
	.catch(err=>{
		res.status(400).json({error:err})
	})
	
})

app.post("/posts",(req,res)=>{
	// validation des données 

	// message d'erreur 
	
	// nekhou les données
	let {title,body} = req.body

	if (!title || !body){
		res.status(400).json({"error":"fields body or title are empty"}) 
	}
	
	let post= new Post({
		title,
		body
	})
	post.save().then((data)=>{
		res.status(201).json(data)

	}).catch(err=>{
		res.status(400).json({error:err})
	})
	
})

app.get("/posts/:id",(req,res)=>{
	let { id }= req.params
	let post = posts.filter(post=>{
		if(post.id==id)
			return post
	})
	if(post.length==0){
		res.status(404).json({"error":"ressource not found"})
		return
	}
	res.json({post})
})
app.listen(port,()=>{
	console.log(`listening on port ${port} ...`)
});

/*
const server = http.createServer(function(req,res){
	console.log(JSON.stringify(req.body))
	console.log(req.method)
	console.log(req.body)
	console.log(req.url)
	if(req.url=="/posts" && req.method=="GET"){
		res.end(JSON.stringify(posts));
	}
	if(req.method=="POST" && req.url=="/posts"){
		console.log("body request")
		
		res.end("")
	}
	if(req.url=="/")
		res.end("welcome no route specified")
	
});
*/





// logique bech tsarbi el client ch7achtou

