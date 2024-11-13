import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"
import "./App.css"
import Logo from "./app/img/argentBankLogo.png"
import circleUser from "./app/img/circle-user-solid.svg"
import signOut from "./app/img/right-from-bracket-solid.svg"
import { logout, selectToken, setUser } from './features/auth/AuthSlice'
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { useEffect, useState } from "react"
import { useGetProfileQuery } from "./app/services/auth"
import { isApiError } from "./utils/helpers"
import { SnackbarProvider } from "notistack"

const App = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(selectToken)
  const [skip, setSkip] = useState(true)
  let { data, error } = useGetProfileQuery(undefined, {
    skip
  })


  useEffect(() => {
    console.log("useeffect")
    if (!token && location.pathname === '/profile') {
      console.log("nav to login")
      navigate('/login')
    }

    if (token) {
      setSkip(false)
      if (location.pathname === '/login') {
        console.log("nav to profile")
        navigate('/profile')
      }
      if (data !== undefined) {
        dispatch(setUser({ user: data }))
      }
    }
  }, [navigate, location, token, dispatch, data]
  )

  return (
    <>
      {isApiError(error) && <div>{error.data.message}</div>}
      
      <nav className="main-nav">
        <Link className="main-nav-logo" to={"/"}>
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="nav">
          {
            data !== undefined && token !== null ?
              <>
                <Link className="main-nav-item" to={"profile"}>
                  <img className="fa" src={circleUser} alt="user" />
                  <p>{data.firstName}</p>
                </Link>
                <button className="main-nav-item" onClick={
                  () => {
                    dispatch(logout())
                    navigate('/')
                  }}
                ><img className="fa" src={signOut} alt="user" /><p>Sign Out</p></button>
              </>
              :
              <Link className="main-nav-item" to={"login"}>
                <img className="fa" src={circleUser} alt="user" />
                <p>Sign In</p>
              </Link>
          }
        </div>
      </nav>
      <Outlet />
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
      <SnackbarProvider/>
    </>
    
  )
}
export default App
