import { isArrayOf, isEqualTo, isOneOf, isString, _validateObject } from "../commonInterface/kacheryTypes"
import { Auth, isAuth } from "./Auth"

export type Project = {
    projectId: string,
    label: string
    ownerId: string
}

export const isProject = (x: any): x is Project => {
    return _validateObject(x, {
        projectId: isString,
        label: isString,
        ownerId: isString
    })
}

//////////////////////////////////////////////////////////////////////////////////
// addProject

export type AddProjectRequest = {
    type: 'addProject',
    ownerId: string,
    label: string,
    auth: Auth
}

export const isAddProjectRequest = (x: any): x is AddProjectRequest => {
    return _validateObject(x, {
        type: isEqualTo('addProject'),
        ownerId: isString,
        label: isString,
        auth: isAuth
    })
}

export type AddProjectResponse = {
    type: 'addProject',
    project: Project
}

export const isAddProjectResponse = (x: any): x is AddProjectResponse => {
    return _validateObject(x, {
        type: isEqualTo('addProject'),
        project: isProject
    })
}

//////////////////////////////////////////////////////////////////////////////////
// getProjects

export type GetProjectsRequest = {
    type: 'getProjects',
    ownerId: string
    auth: Auth
}

export const isGetProjectsRequest = (x: any): x is GetProjectsRequest => {
    return _validateObject(x, {
        type: isEqualTo('getProjects'),
        ownerId: isString,
        auth: isAuth
    })
}

export type GetProjectsResponse = {
    type: 'getProjects',
    projects: Project[]
}

export const isGetProjectsResponse = (x: any): x is GetProjectsResponse => {
    return _validateObject(x, {
        type: isEqualTo('getProjects'),
        projects: isArrayOf(isProject)
    })
}


//////////////////////////////////////////////////////////////////////////////////

export type GuiRequest =
    AddProjectRequest
    | GetProjectsRequest

export const isGuiRequest = (x: any): x is GuiRequest => {
    return isOneOf([
        isAddProjectRequest,
        isGetProjectsRequest
    ])(x)
}

export type GuiResponse =
    AddProjectResponse
    | GetProjectsResponse

export const isGuiResponse = (x: any): x is GuiResponse => {
    return isOneOf([
        isAddProjectResponse,
        isGetProjectsResponse
    ])(x)
}