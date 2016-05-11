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
//UPDATE //todo/:id
app.put('/todos/:id', function(req,res) {
	var toDoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: toDoId});
	var body = _.pick(req.body,'description','completed');
	var validAttributes ={};

  if(!matchedTodo) {
  	 res.status(404).send();
  }

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
  	 validAttributes.completed = body.completed;
  }else if (body.hasOwnProperty('completed')){ //Is Not Boolean
  	   res.status(404).send();
  }
  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.length.trim() > 0) {
      validAttributes.description = body.description.trim();
   }else if (body.hasOwnProperty('description')) {
   		res.status(404).send();   
   }
   // HERE  WE EXTEND.
   _.extend(matchedTodo,validAttributes);
   res.json(matchedTodo)

});

app.listen(PORT, function (){
	console.log('Express listening at port: '+ PORT);
})