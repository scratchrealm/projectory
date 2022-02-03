import { FunctionComponent } from "react";
import ProjectsContext, { useSetupProjects } from "./ProjectsContext";

const ProjectorySetup: FunctionComponent = ({ children }) => {
    return (
        <ProjectsSetup>
            {children}
        </ProjectsSetup>
    )
}


const ProjectsSetup: FunctionComponent = ({ children }) => {
    const projectsValue = useSetupProjects()
    return (
        <ProjectsContext.Provider value={projectsValue} >
            {children}
        </ProjectsContext.Provider>
    )
}

export default ProjectorySetup