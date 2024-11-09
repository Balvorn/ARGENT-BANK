import { setCredentials } from './AuthSlice'
import { useState } from 'react'
import { useLoginMutation } from '../../app/services/auth'
import type { LoginRequest } from '../../app/services/auth'
import { useAppDispatch } from '../../app/hooks'
import circleUser from "../../app/img/circle-user-solid.svg"

export const Login = () => {
  const dispatch = useAppDispatch()
  const [formState, setFormState] = useState<LoginRequest>({
    email: '',
    password: '',
  })

  const [login, { isLoading }] = useLoginMutation()

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }))

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <img className='fa' src={circleUser} alt='user'></img>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor='email'>Email</label>
              <input
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button
              className='sign-in-button'
              disabled={isLoading}
              onClick={async () => {
                try {
                  const response = await login(formState).unwrap()
                  dispatch(setCredentials({ token: response.token }))
                } catch (err) {
                  console.log(err)
                }
              }
              }
            > Sign in
            </button>
          </form>
        </section>
      </main>
    </>
  )
}

export default Login

