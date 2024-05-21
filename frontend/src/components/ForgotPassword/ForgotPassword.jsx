import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useMutation from '../../hooks/useMutation'
import { useForgotPasswordMutation } from '../../redux/api/user'
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [forgotPassword, loading] = useMutation(useForgotPasswordMutation)
    const navigate = useNavigate()
    const { user } = useSelector(({ auth }) => auth)
    const submitHandler = e => {
        e.preventDefault()
        forgotPassword('Sending Password Reset Link to Registering Email ID', email)
    }
    useEffect(() => {
        if (user) return navigate('/')
    }, [navigate, user])
    return (
        <div className='forgotPassword'>
            <form className='forgotPasswordForm' action="" onSubmit={submitHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Social App
                </Typography>
                <input className='forgotPasswordInputs' type="email" placeholder='Enter your email' required value={email} onChange={e => setEmail(e.target.value)} />
                <Button disabled={loading} type='submit'>
                    Send Token
                </Button>
            </form>
        </div>
    )
}

export default ForgotPassword