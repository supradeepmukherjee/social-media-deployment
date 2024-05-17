import { Avatar, Button, Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useMutation from '../../hooks/useMutation'
import { useLazyGetUserQuery, useRegisterMutation } from '../../redux/api/user'
import { userExists, userNotExists } from '../../redux/reducers/auth'
import { nameValidator, passwordValidator } from '../../utils/validators'
import './Register.css'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [chavi, setChavi] = useState(null)
  const [chaviFile, setChaviFile] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [register, loading] = useMutation(useRegisterMutation)
  const [getUser] = useLazyGetUserQuery()
  const handleImgChange = async e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async () => {
      setChavi(reader.result)
    }
    setChaviFile(file)
  }
  const submitHandler = async e => {
    e.preventDefault()
    let validationMsg = ''
    validationMsg = nameValidator(name) || passwordValidator(password) || ''
    if (validationMsg !== '') return toast.error(validationMsg)
    if (!chaviFile) return toast.error('Please upload Chavi')
    const formData = new FormData()
    formData.set('name', name)
    formData.set('email', email)
    formData.set('password', password)
    formData.set('img', chaviFile)
    await register('Registering', formData)
    getUser()
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()))
    navigate('/')
  }
  return (
    <div className='register'>
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant='h3' style={{ padding: '2vmax' }}>
          Social App
        </Typography>
        <Avatar src={chavi} sx={{ height: '10vmax', width: '10vmax' }} />
        <input type="file" accept='image/*' onChange={handleImgChange} />
        <input className='registerInputs' type="text" placeholder='Enter your Name' required value={name} onChange={e => setName(e.target.value)} />
        <input className='registerInputs' type="email" placeholder='Enter your email' required value={email} onChange={e => setEmail(e.target.value)} />
        <input className='registerInputs' type="password" placeholder='Enter your password' required value={password} onChange={e => setPassword(e.target.value)} />
        <Link to='/'>
          <Typography>
            Already Registered?
          </Typography>
        </Link>
        <Button disabled={loading} type='submit'>
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Register