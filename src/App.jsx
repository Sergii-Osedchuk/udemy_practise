import { useState } from 'react';

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from './components/SelectedProject';

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(text) {
    setProjectState(prev => {
      const newTask = {
        text: text,
        projectId: prev.selectedProjectId,
        id: Math.random()
      }
      return {
        ...prev,
        tasks: [...prev.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prev => {
      return {
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== id)
      }
    })
  }

  function handleStartAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: null
      }
    })
  }

  function handleSelectProject(id) {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: id
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectState(prev => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      }
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter(project => project.id !== prev.selectedProjectId)
      }
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = (
    <SelectedProject 
      project = {selectedProject} 
      onDelete = {handleDeleteProject} 
      onAddTask={handleAddTask} 
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  } else if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} handleCancel={handleCancelAddProject}/>
  }
  return (
    <main  className='h-screen my-8 flex gap-8'>
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject}
        projects = {projectState.projects}
        onSelectProject = {handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
