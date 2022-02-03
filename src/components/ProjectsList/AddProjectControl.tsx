import { Button, Table, TableBody } from '@material-ui/core'
import { useSignedIn } from 'commonComponents/googleSignIn/GoogleSignIn'
import { useProjects } from 'core/ProjectsContext'
import React, { FunctionComponent, useCallback, useMemo, useState } from 'react'
import InputRow from '../InputRow/InputRow'

type Props = {
    onClose?: () => void
}

const AddProjectControl: FunctionComponent<Props> = ({onClose}) => {
    const [editLabel, setEditLabel] = useState<string>('')
    const {addProject} = useProjects()
    const {userId} = useSignedIn()
    const handleAdd = useCallback(() => {
        if (!userId) return
        addProject({
            label: editLabel,
            ownerId: userId.toString()
        })
        onClose && onClose()
    }, [onClose, editLabel, userId, addProject])
    const okayToAdd = useMemo(() => {
        if (!editLabel) return false
        return true
    }, [editLabel])
    return (
        <div>
            <Table style={{maxWidth: 400}}>
                <TableBody>
                    <InputRow
                        label="Label"
                        value={editLabel}
                        onChange={setEditLabel}
                    />
                </TableBody>
            </Table>
            <Button onClick={handleAdd} disabled={!okayToAdd}>Add</Button>
            {onClose && <Button onClick={onClose}>Cancel</Button>}
        </div>
    )
}

export default AddProjectControl