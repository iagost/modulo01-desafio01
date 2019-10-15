const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

var numberRequests = 0;
server.use((req, res, next) => {
  console.log("Já foram realizadas " + numberRequests++ + " requisições");
  next();
})

server.post("/projects", (req, res) =>{
  const {id, title, tasks} = req.body;
  projects.push({id: id, title: title, tasks: tasks});

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
})

server.put("/projects/:id", existsProject, (req, res) =>{
  const {id} = req.params;
  const {title} = req.body;
  projects[id].title = title;

  return res.json(projects);
})

server.delete("/projects/:id", existsProject, (req, res) => {
  const {id} = req.params;
  projects.splice(id, 1);

  return res.send({message: "Success!"});
})

server.post("/projects/:id/tasks", existsProject, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;
  
  projects[id].tasks = title;

  return res.json(projects);
})

function existsProject(req, res, next){
  if(!projects[req.params.id]){
    return res.status(400).json({ error: "User does not exists!!" });
  }

  return next();

}

server.listen(3001);