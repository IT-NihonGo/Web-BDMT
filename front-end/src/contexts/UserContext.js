import axiosClient from '../api/axiosClient'
import { createContext, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const providerValue = useMemo(
        () => ({ token, setToken, user, setUser }),
        [token, setToken, user, setUser],
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (token !== 'null') {
            axiosClient.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`
            if (token !== localStorage.getItem('token')) {
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
            }
        } else {
            setUser('null')
            localStorage.setItem('token', "null")
            localStorage.setItem('user', "null")
        }
    }, [ token,  navigate])

    return (
        <UserContext.Provider value={providerValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
