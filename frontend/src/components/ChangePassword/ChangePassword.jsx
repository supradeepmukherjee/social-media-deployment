import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useMutation from '../../hooks/useMutation'
import { useChangePasswordMutation } from '../../redux/api/user'
import { passwordValidator } from '../../utils/validators'
import './ChangePassword.css'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setcPassword] = useState('')
    const navigate = useNavigate('/')
    const [changePassword, loading] = useMutation(useChangePasswordMutation)
    const submitHandler = async e => {
        e.preventDefault()
        let validationMsg = ''
        validationMsg = passwordValidator(password) || ''
        if (validationMsg !== '') return toast.error(validationMsg)
        if (password !== cpassword) return toast.error('Passwords don\'t match ')
        await changePassword('Updating Password', { old: oldPassword, newP: password })
        navigate('/account')
    }
    return (
        <div className='login'>
            <form className='loginForm' action="" onSubmit={submitHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Change Password
                </Typography>
                <input className='changePasswordInputs' type="password" placeholder='Enter current password' required value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                <input className='changePasswordInputs' type="password" placeholder='Enter new password' required value={password} onChange={e => setPassword(e.target.value)} />
                <input className='changePasswordInputs' type="password" placeholder='Confirm new password' required value={cpassword} onChange={e => setcPassword(e.target.value)} />
                <Button disabled={loading} type='submit'>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ChangePassword