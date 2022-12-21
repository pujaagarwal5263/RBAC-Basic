const express = require('express')
const { authUser } = require('../basicAuth')
const router = express.Router()
const { projects } = require('../data')
const { canViewProject, scopedProjects, canDeleteProject } = require('../permissions/project')

router.get('/', authUser, (req, res) => {
  res.json(scopedProjects(req.user, projects))
})

router.get('/:projectId', setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project)
})

router.delete('/:projectId', setProject, authUser, authDeleteProject, (req,res)=>{
   res.send("Deletion successful")
}) 

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId)
  req.project = projects.find(project => project.id === projectId)
  if (req.project == null) {
    res.status(404)
    return res.send('Project not found')
  }
  next()
}

function authGetProject(req,res,next){
  //console.log("tryinh to check perission");
  if(!canViewProject(req.user, req.project)){
    return res.status(403).send("not allowed to view project")
  }
  next()
}

function authDeleteProject(req,res,next){
  if(!canDeleteProject(req.user, req.project)){
    return res.status(403).send("you are not allowed to delete project")
  }
  next()
}

module.exports = router