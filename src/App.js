import './App.scss';
import Footer from './components/include/Footer';
import Header from './components/include/Header';
import MainIndex from './components/main/MainIndex';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUpContainer from './components/container/SignUpContainer';
import LoginContainer from './components/container/LoginContainer';
import ProjectDetailContainer from './components/container/ProjectDetailContainer';
import CreateProjectContainer from './components/container/CreateProjectContainer';
import ProjectListContainer from './components/container/ProjectListContainer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from './util/cookie';
import { loggedIn, loggedOut } from './components/module/user';
import MyPageContainer from './components/container/MyPageContainer';
import { goToHome } from './components/module/utility';
import AllProjectsContainer from './components/container/AllProjectsContainer';
import ProjectEditContainer from './components/container/ProjectEditContainer';
import ProjectTypeListContainer from './components/container/ProjectTypeListContainer';

function App() {
  const dispatch = useDispatch();
  const userId = getCookie('userId');
  const navigate = useNavigate();
  useEffect(()=>{
    if(userId){
      dispatch(loggedIn());
    }else{
      dispatch(loggedOut());
    }
    //eslint-disable-next-line
  },[userId])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<MainIndex />} />
        <Route path='/signup' element={<SignUpContainer />} />
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/projectdetail/:id' element={<ProjectDetailContainer />} />
        <Route path='/createproject' element={<CreateProjectContainer />} />
        <Route path='/projectlist/:name' element={<ProjectListContainer />} />
        <Route path='/mypage/:userId/*' element={<MyPageContainer />} />
        <Route path='/allprojectlist' element={<AllProjectsContainer />} />
        <Route path='/projectedit/:id' element={<ProjectEditContainer />} />
        <Route path='/projecttypelist/:type' element={<ProjectTypeListContainer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
