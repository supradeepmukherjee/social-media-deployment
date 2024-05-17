import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMutation from '../../hooks/useMutation'
import { useForgotPasswordMutation } from '../../redux/api/user'
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [forgotPassword, loading] = useMutation(useForgotPasswordMutation)
    const navigate = useNavigate()
    const submitHandler = async e => {
        e.preventDefault()
        await forgotPassword('Sending Password Reset Link to Registering Email ID', email)
        navigate('/')
    }
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