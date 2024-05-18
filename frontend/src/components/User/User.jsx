import { Typography } from "@mui/material"
import { Link } from "react-router-dom"
import './User.css'

const User = ({ userID, name, chavi }) => {
  return (
    <Link to={`/user/${userID}`} className="user">
      <img src={chavi} alt={name} />
      <Typography>
        {name}
      </Typography>
    </Link>
  )
}

export default User