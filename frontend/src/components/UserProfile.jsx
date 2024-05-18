import { Avatar, Button, Dialog, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useErrors from '../hooks/useErrors'
import useMutation from '../hooks/useMutation'
import { useFollowMutation, useGetUserProfileQuery, useLazyGetUserProfileQuery, useUserPostsQuery } from '../redux/api/user'
import './Account/Account.css'
import Loader from './Loader/Loader'
import Post from './Post/Post'
import User from './User/User'

const UserProfile = () => {
    const { id } = useParams()
    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)
    const [following, setFollowing] = useState(false)
    const [myProfile, setMyProfile] = useState(false)
    const [otherUser, setOtherUser] = useState({})
    const [posts, setPosts] = useState([])
    const { isLoading, data, isError, error } = useGetUserProfileQuery(id)
    const { isLoading: postsLoading, data: postsData, isError: postsIsError, error: postsError } = useUserPostsQuery(id)
    const [getUser] = useLazyGetUserProfileQuery(id)
    const [follow, followLoading] = useMutation(useFollowMutation)
    const { user, loading } = useSelector(({ auth }) => auth)
    const followHandler = async () => {
        setFollowing(!following)
        await follow('Please wait...', id)
        getUser(id)
            .then(({ data: d }) => setOtherUser(d.user))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (user._id === id) setMyProfile(true)
        if (otherUser) {
            otherUser.followers?.forEach(({_id}) => {
                if (_id === user._id) setFollowing(true)
                else setFollowing(false)
            })
        }
    }, [id, otherUser, user._id, user?.followers])
    useErrors([
        { error, isError },
        { error: postsError, isError: postsIsError },
    ])
    useEffect(() => {
        if (data) setOtherUser(data.user)
        if (postsData) setPosts(postsData.posts)
    }, [data, postsData])
    return (
        (isLoading || loading || postsLoading) ? <Loader /> :
            <div className='account'>
                <div className="accountLeft">
                    {posts?.length > 0 ?
                        posts?.map(({ _id, owner, caption, img, likes, comments }) => <Post
                            postID={_id}
                            key={_id}
                            ownerName={owner?.name}
                            caption={caption}
                            postImg={img?.url}
                            likes={likes}
                            comments={comments}
                            ownerImg={owner?.chavi.url}
                            ownerID={owner?._id}
                            page='user'
                            userID={id} />)
                        :
                        <Typography variant='h6'>
                            User hasn't posted until now
                        </Typography>
                    }
                </div>
                <div className="accountRight">
                    <Avatar src={otherUser?.chavi?.url} sx={{ height: '8vmax', width: '8vmax' }} />
                    <Typography variant='h5'>
                        {otherUser?.name}
                    </Typography>
                    <div className="">
                        <button onClick={() => setFollowersToggle(!followersToggle)}>
                            <Typography>
                                Followers
                            </Typography>
                        </button>
                        <Typography>
                            {otherUser?.followers?.length}
                        </Typography>
                    </div>
                    <div className="">
                        <button onClick={() => setFollowingToggle(!followingToggle)}>
                            <Typography>
                                Following
                            </Typography>
                        </button>
                        <Typography>
                            {otherUser?.following?.length}
                        </Typography>
                    </div>
                    <div className="">
                        <Typography>
                            Posts
                        </Typography>
                        <Typography>
                            {otherUser?.posts?.length}
                        </Typography>
                    </div>
                    {myProfile ? <></> :
                        <Button disabled={followLoading || loading} variant='contained' style={{ background: !following ? 'red' : 'blue' }} onClick={followHandler}>
                            {following ? 'Following' : 'Follow'}
                        </Button>}
                    <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                        <div className="dialogBox">
                            <Typography variant='h4'>
                                Followers
                            </Typography>
                            {otherUser?.followers?.length > 0 ?
                                otherUser?.followers?.map(({ _id, name, chavi }) => <User userID={_id} key={_id} name={name} chavi={chavi.url}
                                />)
                                :
                                <Typography style={{ margin: '2vmax' }}>
                                    No followers yet
                                </Typography>
                            }
                        </div>
                    </Dialog>
                    <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                        <div className="dialogBox">
                            <Typography variant='h4'>
                                Following
                            </Typography>
                            {otherUser?.following?.length > 0 ?
                                otherUser?.following?.map(({ _id, name, chavi }) => <User userID={_id} key={_id} name={name} chavi={chavi.url}
                                />)
                                :
                                <Typography style={{ margin: '2vmax' }}>
                                    Not following anyone yet
                                </Typography>
                            }
                        </div>
                    </Dialog>
                </div>
            </div >
    )
}

export default UserProfile