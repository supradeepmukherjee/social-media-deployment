import { lazy, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLazyGetUserQuery } from './redux/api/user'
import { userExists, userNotExists } from './redux/reducers/auth'
import './App.css';
import { Suspense } from 'react';
import Loader from './components/Loader/Loader';
const Account = lazy(() => import('./components/Account/Account'))
const ChangePassword = lazy(() => import('./components/ChangePassword/ChangePassword'))
const Error404 = lazy(() => import('./components/Error404/Error404'))
const ForgotPassword = lazy(() => import('./components/ForgotPassword/ForgotPassword'))
const Navbar = lazy(() => import('./components/Header/Navbar'))
const Home = lazy(() => import('./components/Home/Home'))
const Login = lazy(() => import('./components/Login/Login'))
const NewPost = lazy(() => import('./components/NewPost/NewPost'))
const Register = lazy(() => import('./components/Register/Register'))
const ResetPassword = lazy(() => import('./components/ResetPassword/ResetPassword'))
const Search = lazy(() => import('./components/Search/Search'))
const UpdateProfile = lazy(() => import('./components/UpdateProfile/UpdateProfile'))
const UserProfile = lazy(() => import('./components/UserProfile'))

function App() {
  const dispatch = useDispatch()
  const { user, loading } = useSelector(({ auth }) => auth)
  const [getUser] = useLazyGetUserQuery()
  useEffect(() => {
    getUser()
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()))
  }, [dispatch, getUser])
  return (
    <Router>
      {user &&
        <Suspense fallback={<Loader />}>
          <Navbar />
        </Suspense>}
      {loading ? <Loader /> :
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route exact path='/' element={user ? <Home /> : <Login />} />
            <Route exact path='/account' element={user ? <Account /> : <Login />} />
            <Route exact path='/newpost' element={user ? <NewPost /> : <Login />} />
            <Route exact path='/register' element={user ? <Home /> : <Register />} />
            <Route exact path='/updateProfile' element={user ? <UpdateProfile /> : <Login />} />
            <Route exact path='/changePassword' element={user ? <ChangePassword /> : <Login />} />
            <Route exact path='/forgotPassword' element={user ? <Home /> : <ForgotPassword />} />
            <Route exact path='/resetpassword/:token' element={user ? <Home /> : <ResetPassword />} />
            <Route exact path='/user/:id' element={user ? <UserProfile /> : <Login />} />
            <Route exact path='/search' element={user ? <Search /> : <Login />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </Suspense>}
      <Toaster position='top-center' />
    </Router >
  );
}

export default App;