import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import useMutation from '../../hooks/useMutation'
import { useLazyGetUserQuery, useLazyMyPostsQuery } from '../../redux/api/user'
import { useUploadMutation } from '../../redux/api/user'
import { userExists, userNotExists } from '../../redux/reducers/auth'
import './NewPost.css'

const NewPost = () => {
    const [img, setImg] = useState(null)
    const [caption, setCaption] = useState('')
    const [imgFile, setImgFile] = useState(null)
    const dispatch = useDispatch()
    const [createPost, loading] = useMutation(useUploadMutation)
    const [getUser] = useLazyGetUserQuery()
    const handleImgChange = async e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            setImg(reader.result)
        }
        setImgFile(file)
    }
    const submitHandler = async e => {
        e.preventDefault()
        if (caption !== '') return toast.error('Caption can\'t be blank')
        if (!imgFile) return toast.error('Please upload Image')
        const formData = new FormData()
        formData.set('caption', caption)
        formData.set('img', imgFile)
        await createPost('Uploading new Post', formData)
        getUser()
            .then(({ data }) => dispatch(userExists(data.user)))
            .catch(() => dispatch(userNotExists()))
    }
    return (
        <div className='newPost'>
            <form className='newPostForm' onSubmit={submitHandler}>
                <Typography variant='h3'>
                    New Post
                </Typography>
                {img && <img src={img} alt='post' />}
                <input type="file" accept='image/*' onChange={handleImgChange} />
                <input type="text" placeholder='Caption' value={caption} onChange={e => setCaption(e.target.value)} />
                <Button type='submit' disabled={loading}>
                    Post
                </Button>
            </form>
        </div>
    )
}

export default NewPost