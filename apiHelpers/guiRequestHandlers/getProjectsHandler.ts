import { GetProjectsRequest, GetProjectsResponse, isProject, Project } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';

const getProjectsHandler = async (request: GetProjectsRequest, verifiedUserId: string): Promise<GetProjectsResponse> => {
    if (verifiedUserId !== request.ownerId) {
        throw Error('Not authorized')
    }
    
    const db = firestoreDatabase()
    const collection = db.collection('projects')
    const results = await collection.where('ownerId', '==', request.ownerId).get()
    const projects: Project[] = []
    for (let doc of results.docs) {
        const x = doc.data()
        if (isProject(x)) {
            projects.push(x)
        }
        else {
            console.warn(x)
            console.warn('Invalid project in database')
            // await doc.ref.delete() // only delete if we are sure we want to -- don't risk losing data!
        }
    }
    return {
        type: 'getProjects',
        projects
    }
}

export default getProjectsHandler