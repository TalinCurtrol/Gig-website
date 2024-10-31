import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login/index'
import Tasks from '../components/Tasks'
import SignUp from '../components/SignUp/index'
import PostDetail from '../components/PostDetail'
import Profile from '../components/Profile/index'
import Edit from '../components/Edit/index'
import Changepassword from '../components/Changepassword/index'
import Applicant from '../components/Applicant'
import Welcome from '../components/Admin/Welcome'
import ReportList from '../components/Admin/ReportList'
import UserList from '../components/Admin/UserList'
import PostList from '../components/Admin/PostList'
import CommentList from '../components/Admin/CommentList'
import AdminEntrance from '../components/Admin/AdminEntrance'
import MapAPI from '../components/MapAPI'

const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup'element={<SignUp/>}></Route>
            <Route path='/tasks' element={<Tasks/>}></Route>
            <Route path='/taskDetail' element={<PostDetail />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/edit' element={<Edit />}></Route>
            <Route path='/changepassword' element={<Changepassword />}></Route>
            <Route path='/applicant' element={<Applicant />}></Route>
            <Route path='/welcome' element={<Welcome />}></Route>
            <Route path='/reportlist' element={<ReportList />}></Route>
            <Route path='/userlist' element={<UserList />}></Route>
            <Route path='/postlist' element={<PostList />}></Route>
            <Route path='/commentlist' element={<CommentList />}></Route>
            <Route path='/adminentrance' element={<AdminEntrance />}></Route>
            <Route path='/maptest' element={<MapAPI visible={true}/>}></Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter