
import { useGetProfileQuery } from '../../app/services/auth'

export function Profile() {
    const { data, error, isLoading } = useGetProfileQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

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

    if (data) {
        return (
            <div>Name: {data.email}</div>
        )
    }

    return null
}
