import { useCallback, useEffect, useState } from 'react';
import useGoogleSignInClient from './useGoogleSignInClient';

export const useSignedIn = () => {
    const signInClient = useGoogleSignInClient()
    const [, setUpdateCode] = useState<number>(0)
    const incrementUpdateCode = useCallback(() => {setUpdateCode(c => (c+1))}, [])
    useEffect(() => {
        signInClient?.onSignedInChanged(() => {
            incrementUpdateCode()
        })
    }, [signInClient, incrementUpdateCode])
    return {
        client: signInClient,
        signedIn: signInClient?.signedIn || false,
        userId: signInClient?.userId,
        googleIdToken: signInClient?.idToken || undefined
    }
}