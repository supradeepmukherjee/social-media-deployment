import { Button, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom'
import server from '../../constant'
import { userExists } from '../../redux/reducers/auth'
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(({ auth }) => auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginHandler = async e => {
        e.preventDefault()
        const id = toast.loading('Logging In...')
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/user/login`,
                { email, password },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            dispatch(userExists(data.user))
            toast.success(data.msg, { id })
            redirect('/')
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.msg || 'Something went wrong', { id })
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user) return navigate('/')
    }, [navigate, user])
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