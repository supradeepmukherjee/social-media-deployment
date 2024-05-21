import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Loader from './components/Loader/Loader';
import { useLazyGetUserQuery } from './redux/api/user';
import { userExists, userNotExists } from './redux/reducers/auth';
const Account = lazy(() => import('./components/Account/Account'))
const ChangePassword = lazy(() => import('./components/ChangePassword/ChangePassword'))
const Error404 = lazy(() => import('./components/Error404/Error404'))
const ForgotPassword = lazy(() => import('./components/ForgotPassword/ForgotPassword'))
const Navbar = lazy(() => import('./components/Header/Navbar'))
const Home = lazy(() => import('./components/Home/Home'))
const Login = lazy(() => import('./components/Login/Login'))
const NewPost = lazy(() => import('./components/NewPost/NewPost'))
const Protect = lazy(() => import('./components/Protect'))
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
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/forgotPassword' element={<ForgotPassword />} />
            <Route exact path='/resetpassword/:token' element={<ResetPassword />} />
            <Route element={<Protect user={user} />}>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/account' element={<Account />} />
              <Route exact path='/newpost' element={<NewPost />} />
              <Route exact path='/updateProfile' element={<UpdateProfile />} />
              <Route exact path='/changePassword' element={<ChangePassword />} />
              <Route exact path='/user/:id' element={<UserProfile />} />
              <Route exact path='/search' element={<Search />} />
            </Route>
            <Route path='*' element={<Error404 />} />
          </Routes>
        </Suspense>}
      <Toaster position='top-center' />
    </Router >
  );
}

export default App;