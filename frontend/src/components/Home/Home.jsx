import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useErrors from '../../hooks/useErrors'
import { useGetPostsQuery } from '../../redux/api/post'
import { useAllUsersQuery } from '../../redux/api/user'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import User from '../User/User'
import './Home.css'

const Home = () => {
  const { isLoading, data, isError, error, refetch } = useAllUsersQuery()
  const { isLoading: postsLoading, data: postsData, isError: postsIsError, error: postsError } = useGetPostsQuery()
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  useErrors([
    { error, isError },
    { error: postsError, isError: postsIsError }
  ])
  useEffect(() => {
    if (data) setUsers(data.users)
    if (postsData) setPosts(postsData.posts)
  }, [data, postsData])
  return (
    isLoading || postsLoading ? <Loader /> :
      <div className='home'>
        <div className="homeLeft">
          {posts?.length > 0 ?
            posts?.map(({ _id, owner, caption, img, likes, comments }) => <Post
              postID={_id}
              key={_id}
              ownerName={owner.name}
              caption={caption}
              postImg={img.url}
              likes={likes}
              comments={comments}
              ownerImg={owner.chavi.url}
              ownerID={owner._id}
              refetch={refetch} />)
            :
            <Typography variant='h6'>
              No posts yet
            </Typography>
          }
        </div>
        <div className="homeRight">
          {users.length > 0 ?
            users.map(({ _id, name, chavi }) => <User userID={_id} key={_id} name={name} chavi={chavi.url} />
            )
            :
            <Typography variant='h6'>
              No users yet
            </Typography>
          }
        </div>
      </div>
  )
}

export default Home