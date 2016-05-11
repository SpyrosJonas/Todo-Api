var express = require('express');
var bodyParser =require('body-parser');
var _ = require('underscore');

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
    var stringToSend = _.findWhere(todos,{id:toDoId});
 //    console.log(toDoId);
    
 
	// //res.json(todos[req.params.id-1]);
	//  todos.forEach(function (todo){
	//  	if (todo.id === toDoId){
	//  		stringToSend=todo;
	//  	}
	//  });

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
    body = _.pick(body, 'description', 'completed');

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length ===0 ){
    	return res.status(404).send();
    }
    body.description = body.description.trim();

    body.id =  todoNextId++;
  
    todos.push(body);
    //console.log(body.description);
	res.send(body);
	

});

//DELETE /todos/id
app.delete('/todos/:id', function(req,res){
	var matchedTodo = _.findWhere(todos, {id: parseInt(req.params.id,10)});

	 if (matchedTodo){ //(typeof stringToSend === 'undefined'){
    	
    	todos = _.without(todos, matchedTodo);
    	res.json(matchedTodo);
    } else
    {
    	res.status(404).json({"error":"Unabale to find tod with that id"});
    }
	
})

app.listen(PORT, function (){
	console.log('Express listening at port: '+ PORT);
})