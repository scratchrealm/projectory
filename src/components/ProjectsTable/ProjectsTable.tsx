import React, { FunctionComponent, useMemo } from 'react';
import Hyperlink from 'commonComponents/Hyperlink/Hyperlink';
import NiceTable from 'commonComponents/NiceTable/NiceTable';
import { Project } from 'types/GuiRequest';

type Props = {
    projects: Project[]
    onClickProject: (project: Project) => void
}

const ProjectsTable: FunctionComponent<Props> = ({projects, onClickProject}) => {
    const columns = useMemo(() => {
        const c = []
        c.push({
            key: 'label',
            label: 'Project'
        })
        c.push({
            key: 'ownerId',
            label: 'Owner'
        })
        c.push({
            key: 'projectId',
            label: 'ID'
        })
        return c
    }, [])
    const rows = useMemo(() => (
        projects.map((project) => (
            {
                key: project.projectId,
                columnValues: {
                    label: {
                        text: project.label,
                        element: <Hyperlink onClick={onClickProject ? () => {onClickProject(project)} : undefined}>{project.label}</Hyperlink>
                    },
                    ownerId: project.ownerId,
                    projectId: {
                        text: project.projectId,
                        element: <Hyperlink onClick={onClickProject ? () => {onClickProject(project)} : undefined}>{project.projectId}</Hyperlink>
                    }
                }
            }
        ))
    ), [projects, onClickProject])
    return (
        <div>
            <NiceTable
                columns={columns}
                rows={rows}
            />
        </div>
    )
}

export default ProjectsTable