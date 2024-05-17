import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useLazyAllUsersQuery } from '../../redux/api/user'
import User from '../User'
import './Search.css'

const Search = () => {
    const [name, setName] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [allUsers] = useLazyAllUsersQuery()
    const submitHandler = async e => {
        e.preventDefault()
        setLoading(true)
        allUsers(name)
            .then(({ data }) => setUsers(data.users))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }
    return (
        <div className='search'>
            <form className="searchForm" onSubmit={submitHandler}>
                <Typography variant='h3' style={{ padding: '2vmax' }}>
                    Search a Person
                </Typography>
                <input type="text" placeholder='Update your Name' required value={name} onChange={e => setName(e.target.value)} />
                <Button disabled={loading} type='submit'>
                    Search
                </Button>
                <div className="searchResults">
                    {users?.map(({ _id, name, chavi }) => <User
                        key={_id}
                        userID={_id}
                        name={name}
                        chavi={chavi.url} />)}
                </div>
            </form>
        </div>
    )
}

export default Search