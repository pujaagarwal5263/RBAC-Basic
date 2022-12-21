const { ROLE, projects } = require("../data")

canViewProject=(user, project)=>{
    return user.role=== ROLE.ADMIN || project.userId===user.id
}

canDeleteProject=(user,project)=>{
    return project.userId===user.id
}

scopedProjects=(user,projects)=>{
  if(user.role==ROLE.ADMIN){
    return projects;
  }
  return projects.filter(project => project.userId==user.id)
}

module.exports={canViewProject, scopedProjects, canDeleteProject}