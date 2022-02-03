import { VerifiedReCaptchaInfo } from "../../api/gui";
import { AddProjectRequest, AddProjectResponse, Project } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';


const addProjectHandler = async (request: AddProjectRequest, verifiedUserId: string, verifiedReCaptchaInfo: VerifiedReCaptchaInfo): Promise<AddProjectResponse> => {
    if (!verifiedReCaptchaInfo) {
        if (process.env.REACT_APP_RECAPTCHA_KEY) {
            throw Error('Recaptcha info is not verified')
        }
    }
    if (verifiedUserId !== request.ownerId) {
        throw Error('Not authorized')
    }

    const db = firestoreDatabase()
    const projectId = randomAlphaString(20)
    const collection = db.collection('projects')
    const projectRef = collection.doc(projectId)
    const project: Project = {
        projectId,
        label: request.label,
        ownerId: request.ownerId
    }
    await projectRef.set(project)
    return {
        type: 'addProject',
        project
    }
}

const randomAlphaString = (num_chars: number) => {
    if (!num_chars) {
        /* istanbul ignore next */
        throw Error('randomAlphaString: num_chars needs to be a positive integer.')
    }
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < num_chars; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export default addProjectHandler