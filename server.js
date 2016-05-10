var express = require('express');
var bodyParser =require('body-parser');


var app = express();
var PORT = process.env.PORT || 3000;
var todoNextId = 1;
var todos = [];

app.use(bodyParser.json());

app.get('/', function (req,res){
	res.send('Todo API Root');
});
//Get
app.get('/todos', function(req,res){
   res.json(todos);
});

app.get('/todos/:id', function(req,res){
    //res.send('Asking for todo with id of: '+ req.params.id);
    var toDoId = parseInt(req.params.id,10);
    var stringToSend;
    console.log(toDoId);
    // for(var i=0; i<todos.length; i++){
    // 	console.log(todos[i]);
    // 	if (todos[i].id=== toDoId){
    //         stringToSend=todos[i];
    // 	}
    // }

    // if (typeof stringToSend === 'undefined'){
    // 	res.status(404).send();
    // } else
    // {
    // 	res.json(stringToSend);
    // }
 
	//res.json(todos[req.params.id-1]);
	 todos.forEach(function (todo){
	 	if (todo.id === toDoId){
	 		stringToSend=todo;
	 	}
	 });

	 if (stringToSend){ //(typeof stringToSend === 'undefined'){
    	res.json(stringToSend);
    } else
    {
    	res.status(404).send();
    }
});
//POST /todos no ID at the end
app.post('/todos', function(req,res){
    var body = req.body;
    body.id =  todoNextId++;
  
    todos.push(body);
    //console.log(body.description);
	res.send(body);
	

});

app.listen(PORT, function (){
	console.log('Express listening at port: '+ PORT);
})