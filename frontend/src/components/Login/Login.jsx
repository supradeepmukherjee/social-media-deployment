import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useMutation from '../../hooks/useMutation'
import { useLazyGetUserQuery, useLoginMutation } from '../../redux/api/user'
import { userExists, userNotExists } from '../../redux/reducers/auth'
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, loading] = useMutation(useLoginMutation)
    const [getUser] = useLazyGetUserQuery()
    const loginHandler = async e => {
        e.preventDefault()
        await login('Logging In', { email, password })
        getUser()
            .then(({ data }) => dispatch(userExists(data.user)))
            .catch(() => dispatch(userNotExists()))
        navigate('/')
    }
    return (
        <div className='login'>
            <form className='loginForm' action="" onSubmit={loginHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Social App
                </Typography>
                <input type="email" placeholder='Enter your email' required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Enter your password' required value={password} onChange={e => setPassword(e.target.value)} />
                <Link to={'/forgotPassword'}>
                    <Typography >
                        Forgot Password?
                    </Typography>
                </Link>
                <Button type='submit' disabled={loading}>
                    Login
                </Button>
                <Link to={'/register'}>
                    <Typography >
                        New User?
                    </Typography>
                </Link>
            </form>
        </div>
    )
}

export default Login