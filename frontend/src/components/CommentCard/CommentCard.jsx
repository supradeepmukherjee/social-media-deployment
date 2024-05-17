import { Delete } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useMutation from '../../hooks/useMutation'
import { useDelCommentMutation } from '../../redux/api/post'
import './CommentCard.css'

const CommentCard = ({ userID, name, chavi, comment, commentID, postID, isAccount, refetch }) => {
    const { user } = useSelector(({ auth }) => auth)
    const [delComment, loading] = useMutation(useDelCommentMutation)
    const del = async () => {
        await delComment('Deleting Comment', { id: postID, commentID })
        refetch()
    }
    return (
        <div className='commentUser'>
            <Link to={`/user/${userID}`}>
                <img src={chavi} alt={name} />
                <Typography style={{ minWidth: '6vmax' }}>
                    {name}
                </Typography>
            </Link>
            <Typography>
                {comment}
            </Typography>
            {isAccount ?
                <Button onClick={del} disabled={loading}>
                    <Delete />
                </Button>
                :
                (userID === user._id ?
                    <Button onClick={del} disabled={loading}>
                        <Delete />
                    </Button>
                    : <></>)}
        </div>
    )
}

export default CommentCard