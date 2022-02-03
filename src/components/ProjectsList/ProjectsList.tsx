import { IconButton } from '@material-ui/core';
import { AddCircle, Refresh } from '@material-ui/icons';
import React, { FunctionComponent, useCallback } from 'react';
import { useProjects } from '../../core/ProjectsContext';
import ProjectsTable from '../ProjectsTable/ProjectsTable';
import useVisible from '../misc/useVisible';
import useRoute from '../useRoute';
import AddProjectControl from './AddProjectControl';
import { Project } from 'types/GuiRequest';

type Props = {

}

const ProjectsList: FunctionComponent<Props> = () => {
    const {projects, refreshProjects} = useProjects()

    const addVisible = useVisible()

    const {setRoute} = useRoute()

    const handleClickProject = useCallback((project: Project) => {
        setRoute({routePath: `/project/${project.projectId}`})
    }, [setRoute])
    
    return (
        <div>
            <h3>Projects</h3>
            <IconButton onClick={refreshProjects} title="Refresh projects"><Refresh /></IconButton>
            <IconButton onClick={addVisible.show} title="Add project"><AddCircle /></IconButton>
            {
                addVisible.visible && (
                    <AddProjectControl
                        onClose={addVisible.hide}
                    />
                )
            }
            <ProjectsTable
                projects={projects}
                onClickProject={handleClickProject}
            />
        </div>
    )
}

export default ProjectsList