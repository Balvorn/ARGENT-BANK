import { useNavigate } from 'react-router-dom'
import { setCredentials, selectToken } from './AuthSlice'
import {useEffect, useState} from 'react'
import { useLoginMutation } from '../../app/services/auth'
import type { LoginRequest } from '../../app/services/auth'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

function PasswordInput({
  name,
  onChange,
}: {
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
      <input
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        name={name}
        onChange={onChange}
      />
      <button onClick={handleClick}>
        {show ? 'Hide' : 'Show'}
      </button >
    </>

  )
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(selectToken)
  const [formState, setFormState] = useState<LoginRequest>({
    email: '',
    password: '',
  })

  const [login, { isLoading }] = useLoginMutation()

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }))

  useEffect(() => {
    if (token) {
      navigate('/profile')
    }
  }, [navigate, token]
  )

  return (
    <>
      <div>Sign In</div>
      <label htmlFor='email'>Email</label>
      <input
        onChange={handleChange}
        name="email"
        type="text"
        placeholder="Email"
      />
      <label htmlFor='password'>password</label>
      <PasswordInput onChange={handleChange} name="password" />
      <button
        disabled={isLoading}
        onClick={async () => {
          try {
            const response = await login(formState).unwrap()
            dispatch(setCredentials({ token: response.token }))
            navigate('/profile')
          } catch (err) {
            console.log(err)
          }
        }
        }
      > Log in
      </button>

    </>
  )
}

export default Login

