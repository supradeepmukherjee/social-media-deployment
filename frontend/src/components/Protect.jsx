import { Navigate, Outlet } from "react-router-dom";

const Protect = ({ user, redirect = '/login' }) => {
    if (!user) return <Navigate to={redirect} />
    return <Outlet />
}

export default Protect