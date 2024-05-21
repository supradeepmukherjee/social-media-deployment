import { Avatar, Button, Dialog, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import server from '../../constant'
import useErrors from '../../hooks/useErrors'
import useMutation from '../../hooks/useMutation'
import { useDelProfileMutation, useMyPostsQuery } from '../../redux/api/user'
import { userNotExists } from '../../redux/reducers/auth'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import User from '../User/User'
import './Account.css'

const Account = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(({ auth }) => auth)
  const [followersToggle, setFollowersToggle] = useState(false)
  const [followingToggle, setFollowingToggle] = useState(false)
  const [posts, setPosts] = useState([])
  const [delProfile, loading] = useMutation(useDelProfileMutation)
  const { isLoading, data, error, isError, refetch } = useMyPostsQuery()
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/user/logout`, { withCredentials: true })
      dispatch(userNotExists())
      toast.success(data.msg)
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.msg || 'Something went wrong')
    }
    navigate('/login')
  }
  const delHandler = async () => {
    await delProfile('Deleting Account')
    dispatch(userNotExists())
    navigate('/register')
  }
  useErrors([{ error, isError }])
  useEffect(() => {
    if (data) setPosts(data.posts)
  }, [data])
  return (
    isLoading ? <Loader /> :
      <div className='account'>
        <div className="accountLeft">
          {posts?.length > 0 ?
            posts?.map(({ _id, caption, img, likes, comments, owner }) => <Post
              postID={_id}
              key={_id}
              ownerName={user?.name}
              caption={caption}
              postImg={img.url}
              likes={likes}
              comments={comments}
              ownerImg={user?.chavi.url}
              ownerID={owner._id}
              isAccount={true}
              isDelete={true}
              refetch={refetch} />)
            :
            <Typography variant='h6'>
              You have not posted till now
            </Typography>
          }
        </div>
        <div className="accountRight">
          <Avatar src={user?.chavi.url} sx={{ height: '8vmax', width: '8vmax' }} />
          <Typography variant='h5'>
            {user?.name}
          </Typography>
          <div className="">
            <button onClick={() => setFollowersToggle(!followersToggle)}>
              <Typography>
                Followers
              </Typography>
            </button>
            <Typography>
              {user?.followers.length}
            </Typography>
          </div>
          <div className="">
            <button onClick={() => setFollowingToggle(!followingToggle)}>
              <Typography>
                Following
              </Typography>
            </button>
            <Typography>
              {user?.following.length}
            </Typography>
          </div>
          <div className="">
            <Typography>
              Posts
            </Typography>
            <Typography>
              {user?.posts.length}
            </Typography>
          </div>
          <Button variant='contained' onClick={logoutHandler}>
            Logout
          </Button>
          <Link to='/updateProfile'>
            Update Profile
          </Link>
          <Link to='/changePassword'>
            Change Password
          </Link>
          <Button disabled={loading} onClick={delHandler} variant='text' style={{ color: 'red', margin: '2vmax' }}>
            Delete my Account
          </Button>
          <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
            <div className="dialogBox">
              <Typography variant='h4'>
                Followers
              </Typography>

              {user?.followers.length > 0 ?
                user?.followers.map(({ _id, name, chavi }) => <User userID={_id} key={_id} name={name} chavi={chavi.url}
                />)
                :
                <Typography style={{ margin: '2vmax' }}>
                  You have no followers
                </Typography>
              }
            </div>
          </Dialog>
          <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
            <div className="dialogBox">
              <Typography variant='h4'>
                Following
              </Typography>
              {user?.following.length > 0 ?
                user?.following.map(({ _id, name, chavi }) => <User userID={_id} key={_id} name={name} chavi={chavi.url}
                />)
                :
                <Typography style={{ margin: '2vmax' }}>
                  You dont follow anyone
                </Typography>
              }
            </div>
          </Dialog>
        </div>
      </div>
  )
}

export default Account