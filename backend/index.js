const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const PORT = 3001

// Initial ToDo lists on server restart.
let toDoListsDict = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [
      {
        title: 'First todo of first list!',
        done: false
    }]
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [
      {
        title: 'First todo of second list!',
        done: false
    }]
  }
};

// Update of CORS policy
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use( bodyParser.json() ); // To support JSON-encoded bodies

// Endpoint for retrieval of ToDo lists from server.
app.get('/retrieve-todo-list/', (req, res) => {
  res.send(toDoListsDict);
});

// Endpoint for storing of ToDo lists on server.
app.post('/store-todo-list/', (req, res) => {
  let toDoList = req.body;
  if (toDoList) {
    toDoListsDict[toDoList.id] = toDoList;
    res.status(201);
    res.send();
  } else {
    res.status(406);
    res.send("Incorrect request!");
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
