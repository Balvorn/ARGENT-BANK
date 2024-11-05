import { useNavigate } from 'react-router-dom'
import { setCredentials } from './AuthSlice'
import * as React from 'react'
import { useLoginMutation } from '../../app/services/auth'
import type { LoginRequest } from '../../app/services/auth'
import { useAppDispatch } from '../../app/hooks'

function PasswordInput({
  name,
  onChange,
}: {
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const [show, setShow] = React.useState(false)
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

  const [formState, setFormState] = React.useState<LoginRequest>({
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
        <div>Hint: enter anything, or leave it blank and hit login</div>
          <input
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email"
          />
          <PasswordInput onChange={handleChange} name="password" />
        <button
          onClick={async () => {
            console.log(formState)
            try {
              const response = await login(formState).unwrap()
              console.log(response)
              dispatch(setCredentials({token : response.token}))
              navigate('/profile')
            } catch (err) {
              console.log(err)
          }}
        }
        >
          Login
        </button>

    </>
  )
}

export default Login

