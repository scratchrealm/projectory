import React, { useCallback, useContext, useEffect, useState } from "react";
import { AddProjectRequest, GetProjectsRequest, Project } from "types/GuiRequest";
import { useSignedIn } from "commonComponents/googleSignIn/GoogleSignIn";
import guiApiRequest from "common/guiApiRequest";

const ProjectsContext = React.createContext<{
    projects: Project[]
    refreshProjects: () => void
    addProject: (a: {ownerId: string, label: string}) => void
}>({projects: [], refreshProjects: () => {}, addProject: () => {}})

export const useSetupProjects = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const {userId, googleIdToken} = useSignedIn()
    const refreshProjects = useCallback(() => {
        if (!userId) return
        ;(async () => {
            const req: GetProjectsRequest = {
                type: 'getProjects',
                ownerId: userId.toString(),
                auth: {
                    userId: userId.toString(),
                    googleIdToken
                }
            }
            const resp = await guiApiRequest(req, {reCaptcha: false})
            if (resp.type !== 'getProjects') {
                throw Error('Unexpected response type')
            }
            setProjects(resp.projects)
        })()
    }, [userId, googleIdToken])
    const addProject = useCallback((a: {ownerId: string, label: string}) => {
        const {ownerId, label} = a
        if (!userId) return
        ;(async () => {
            const req: AddProjectRequest = {
                type: 'addProject',
                ownerId,
                label,
                auth: {
                    userId: userId.toString(),
                    googleIdToken
                }
            }
            const resp = await guiApiRequest(req, {reCaptcha: true})
            if (resp.type !== 'addProject') {
                throw Error('Unexpected response type')
            }
            refreshProjects()
        })()
    }, [userId, googleIdToken, refreshProjects])
    useEffect(() => {
        refreshProjects()
    }, [refreshProjects])
    return {projects, refreshProjects, addProject}
}

export const useProjects = () => {
    return useContext(ProjectsContext)
}

export default ProjectsContext