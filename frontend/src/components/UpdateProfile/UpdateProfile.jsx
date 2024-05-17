import { Avatar, Button, Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useMutation from '../../hooks/useMutation'
import { useLazyGetUserQuery, useUpdateProfileMutation } from '../../redux/api/user'
import { userExists } from '../../redux/reducers/auth'
import { nameValidator } from '../../utils/validators'
import Loader from '../Loader/Loader'
import './UpdateProfile.css'

const UpdateProfile = () => {
    const { user, loading } = useSelector(({ auth }) => auth)
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.name)
    const [chavi, setChavi] = useState(user.chavi.url)
    const [chaviFile, setChaviFile] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [getUser] = useLazyGetUserQuery()
    const [updateProfile, updateLoading] = useMutation(useUpdateProfileMutation)
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
        const formData = new FormData()
        if (name !== user.name) {
            let validationMsg = ''
            validationMsg = nameValidator(name) || ''
            if (validationMsg !== '') return toast.error(validationMsg)
            formData.set('name', name)
        }
        if (email !== user.email) formData.set('email', user.email)
        if (chavi !== user.chavi.url) formData.append('chavi', chaviFile)
        toast.dismiss()
        await updateProfile('Updating Profile', formData)
        getUser()
            .then(({ data }) => dispatch(userExists(data.user)))
            .catch(err => console.log(err))
        navigate('/account')
    }
    return (
        loading ? <Loader /> :
            <div className='updateProfile'>
                <form className="updateProfileForm" onSubmit={submitHandler}>
                    <Typography variant='h3' style={{ padding: '2vmax' }}>
                        Update Profile
                    </Typography>
                    <Avatar src={chavi} sx={{ height: '10vmax', width: '10vmax' }} />
                    <input type="file" accept='image/*' onChange={handleImgChange} />
                    <input className='updateProfileInputs' type="text" placeholder='Update your Name' required value={name} onChange={e => setName(e.target.value)} />
                    <input className='updateProfileInputs' type="email" placeholder='Update your email' required value={email} onChange={e => setEmail(e.target.value)} />
                    <Button disabled={updateLoading || loading} type='submit'>
                        Update Profile
                    </Button>
                </form>
            </div>
    )

}

export default UpdateProfile