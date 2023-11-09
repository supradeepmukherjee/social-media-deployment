import { Link } from 'react-router-dom'
import './Header.css'
import { Home, HomeOutlined, Add, AddOutlined, Search, SearchOutlined, AccountCircle, AccountCircleOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { Tooltip } from '@mui/material'

const Navbar = () => {
    const [tab, setTab] = useState(window.location.pathname)
    return (
        <div className='header'>
            <Tooltip title="Home" arrow>
                <Link to={'/'} onClick={() => setTab('/')}>
                    {tab === '/' ? <Home style={{ color: 'black' }} /> : <HomeOutlined />}
                </Link>
            </Tooltip>
            <Tooltip title="Create New Post" arrow>
                <Link to={'/newpost'} onClick={() => setTab('/newpost')}>
                    {tab === '/newpost' ? <Add style={{ color: 'black' }} /> : <AddOutlined />}
                </Link>
            </Tooltip>
            <Tooltip title="Search" arrow>
                <Link to={'/search'} onClick={() => setTab('/search')}>
                    {tab === '/search' ? <Search style={{ color: 'black' }} /> : <SearchOutlined />}
                </Link>
            </Tooltip>
            <Tooltip title="My Profile" arrow>
                <Link to={'/account'} onClick={() => setTab('/account')}>
                    {tab === '/account' ? <AccountCircle style={{ color: 'black' }} /> : <AccountCircleOutlined />}
                </Link>
            </Tooltip>
        </div>
    )
}

export default Navbar