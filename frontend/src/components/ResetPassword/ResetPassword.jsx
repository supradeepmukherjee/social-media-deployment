import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useMutation from '../../hooks/useMutation'
import { useResetPasswordMutation } from '../../redux/api/user'
import { passwordValidator } from '../../utils/validators'
import './ResetPassword.css'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [cpassword, setcPassword] = useState('')
    const { token } = useParams()
    const navigate = useNavigate()
    const [resetPassword, loading] = useMutation(useResetPasswordMutation)
    const submitHandler = async e => {
        e.preventDefault()
        let validationMsg = ''
        validationMsg = passwordValidator(password) || ''
        if (validationMsg !== '') return toast.error(validationMsg)
        if (password !== cpassword) return toast.error('Passwords don\'t match ')
        await resetPassword('Resetting Password', { token, password })
        navigate('/')
    }
    return (
        <div className='resetPassword'>
            <form className='resetPasswordForm' action="" onSubmit={submitHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Reset Password
                </Typography>
                <input className='resetPasswordInputs' type="password" placeholder='Enter new password' required value={password} onChange={e => setPassword(e.target.value)} />
                <input className='resetPasswordInputs' type="password" placeholder='Confirm new password' required value={cpassword} onChange={e => setcPassword(e.target.value)} />
                <Link to={'/forgotPassword'}>
                    <Typography>
                        Request Another Token
                    </Typography>
                </Link>
                <Typography style={{ marginLeft: '37vw' }}>
                    OR
                </Typography>
                <Link to={'/'}>
                    <Typography>
                        Login
                    </Typography>
                </Link>
                <Button disabled={loading} type='submit'>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ResetPassword