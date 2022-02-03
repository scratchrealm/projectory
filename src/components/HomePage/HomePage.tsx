import ProjectsList from 'components/ProjectsList/ProjectsList';
import React, { FunctionComponent } from 'react';

type Props = {
    width: number
    height: number
}

const HomePage: FunctionComponent<Props> = () => {
    return (
        <div>
            <ProjectsList />
        </div>
    )
}

export default HomePage