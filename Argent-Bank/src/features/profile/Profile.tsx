import { selectCurrentUser, setUser } from '../auth/AuthSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useState } from 'react'
import { useEditProfileMutation } from '../../app/services/auth'
export function Profile() {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectCurrentUser)
    const [formState, setFormState] = useState<{ firstName: string, lastName: string }>({
        firstName: "",
        lastName: "",
    })
    const [editProfile, { isLoading, error }] = useEditProfileMutation()

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))

    const [editMode, setMode] = useState(false);
    function toggleMode() {
        setMode(prevMode => !prevMode)
    }

    return (
        <main className="main bg-dark">
            {
                user &&
                <>
                    <div className="header">
                        <h1>Welcome back</h1>
                        {
                            editMode ?
                                <div className='form-wrapper'>
                                    <form className='edit-form'
                                        onSubmit={async (e) => {
                                            e.preventDefault()
                                            try {
                                                const response = await editProfile(formState).unwrap()
                                                dispatch(setUser({ user: response }))
                                                toggleMode()
                                            } catch (err) {
                                                console.log(err)
                                            }
                                        }
                                        }>
                                        <div >
                                            <input
                                                minLength={2}
                                                required
                                                onChange={handleChange}
                                                name="firstName"
                                                type="text"
                                                placeholder={user.firstName}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                minLength={2}
                                                required
                                                type='text'
                                                placeholder={user.lastName}
                                                name="lastName"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <button
                                                className='edit-profile-button'
                                                type="submit"
                                                disabled={isLoading}
                                            > Save
                                            </button>

                                            <button
                                                className='edit-profile-button'
                                                disabled={isLoading}
                                                onClick={toggleMode}
                                            > Cancel
                                            </button></div>

                                    </form>
                                </div>
                                :
                                <div className='infos'>
                                    <h1>{user.firstName} {user.lastName}</h1>
                                    <button className="edit-button" onClick={toggleMode}>Edit Name</button>
                                </div>
                        }
                    </div>
                    <h2 className="sr-only">Accounts</h2>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                            <p className="account-amount">$2,082.79</p>
                            <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                            <p className="account-amount">$10,928.42</p>
                            <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                            <p className="account-amount">$184.30</p>
                            <p className="account-amount-description">Current Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                </>
            }
        </main>
    )
}