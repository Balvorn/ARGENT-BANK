import { useNavigate } from 'react-router-dom'
import { setUser, selectCurrentUser, logout } from '../auth/AuthSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useGetProfileQuery } from '../../app/services/auth'
import { useEffect } from 'react'

export function Profile() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(selectCurrentUser)
    let { data, error, isLoading } = useGetProfileQuery(undefined, {
        // perform a refetch every 15mins
        pollingInterval: 900000
    })

    useEffect(() => {
        if (data !== undefined) {
            dispatch(setUser({ user: data }))
        }
    }, [data, dispatch])

    if (isLoading) {
        return <div>Loading...</div>
    } else {
        if (error) {
            if ('status' in error) {
                // you can access all properties of `FetchBaseQueryError` here
                const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

                return (
                    <div>
                        <div>An error has occurred:</div>
                        <div>{errMsg}</div>
                    </div>
                )
            }
            // you can access all properties of `SerializedError` here
            return <div>{error.message}</div>
        }

        if (user) {
            return (<>
                <div>Welcome back
                    Tony Jarvis!</div>
                <button onClick={
                    () => {
                        dispatch(logout())
                        navigate('/')
                    }}
                >Log out</button>
            </>
            )
        }
    }

    return null
}
