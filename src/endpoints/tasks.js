/* eslint-disable no-undef */
const express = require('express');
const app = express()
const port = 3000;
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors())

app.use(bodyParser.json());


const tasks = [
    { 
        id: 1, 
        titel: 'Essen kaufen', 
        created_at: '2023-06-15', 
        completed_at: '2023-06-17' 
    },
    { 
        id: 2, 
        titel: 'Ins Fitness gehen', 
        created_at: '2023-06-20', 
        completed_at: '2023-06-21' 
    },
    { 
        id: 3, 
        titel: 'Mathematik lernen', 
        created_at: '2023-05-10', 
        completed_at: null
    }
];

app.get('/tasks', (req, res) => {
    res.json(tasks);
    res.status(200);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;

    let newId = 1;
    let idExists = true;

    while (idExists) {
        idExists = tasks.some((task) => task.id === newId);
        if (idExists) {
            newId++;
        }
    }

    newTask.id = newId;

    tasks.push(newTask);
    res.json(newTask);
    res.status(201);
});


app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;

    // eslint-disable-next-line no-prototype-builtins
    if (tasks.hasOwnProperty(id)) {
        res.json(tasks[id]);
        res.status(200).send('Task successfully retrieved.');
    } else {
        res.status(404).send('Task not Found' );
    }
});


app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const updatedTask = req.body;

    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    
    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        res.json(updatedTask);
        res.status(200).send('Task successfully updated.');
    } else {
        res.status(404).send('Task not found.');
    }
});

app.delete('/tasks/:id', (req, res) => {
    const idToDelete = req.params.id;

    const taskIndex = tasks.findIndex(task => task.id === parseInt(idToDelete));

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(200).send('Task successfully deleted.');
    } else {
        res.status(404).send('Task not found.');
    }
});

app.use(function(req, res, next) {
  res.status(404).send('404 Not Found');
}); 

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});
