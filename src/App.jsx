import { useState } from 'react';

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: []
  })

  function handleStartAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: null
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectState(prev => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }
      console.log(projectState);
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject]
      }
    })
  }

  let content;

  if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  } else if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject}/>
  }
  return (
    <main  className='h-screen my-8 flex gap-8'>
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject}
        projects = {projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
