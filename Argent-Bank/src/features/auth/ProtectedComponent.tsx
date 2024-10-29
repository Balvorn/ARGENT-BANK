
import { useProtectedMutation } from '../../app/services/auth'

export function ProtectedComponent() {
    const [attemptAccess, { data, error, isLoading }] = useProtectedMutation()

    return (
        <>
            <div>
                <button onClick={() => attemptAccess()}>
                    Make an authenticated request
                </button>
            </div>
            <div>
                {data ? (
                    <>
                        Data:
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </>
                ) : error ? (
                    <>
                        Error: <pre>{JSON.stringify(error, null, 2)}</pre>
                    </>
                ) : null}
            </div>
        </>
    )
}
