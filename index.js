const express = require("express");
const http = require("http");
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
let todos = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", express.static(path.join(__dirname, "Pubblico")));

app.post("/todo/add", (req, res) => {

   const todo = req.body.todo;
   todos.push(todo);
   

   res.json({result: "Ok"});

});

app.get("/todo", (req, res) => {

   res.json({todos: todos});

});

app.put("/todo/complete", (req, res) => {
   const todoId = req.body.id;

   const index = todos.findIndex(t => t.id === todoId);
   if (index !== -1) {
      todos[index].completed = true;
      res.json({ result: "Ok" });
   } else {
      res.status(404).json({ result: "Todo non trovato" });
   }
});

app.delete("/todo/:id", (req, res) => {

   
   
      todos = todos.filter((element) => element.id== req.params.id);

      

   res.json({result: "Ok"});  

})

const server = http.createServer(app);
    
      server.listen(5050, () => {
        console.log("- server running");
      })


