import './App.scss';
import Footer from './components/include/Footer';
import Header from './components/include/Header';
import MainIndex from './components/main/MainIndex';
import { Routes, Route } from 'react-router-dom';
import SignUpContainer from './components/container/SignUpContainer';
import LoginContainer from './components/container/LoginContainer';
import ProjectDetailContainer from './components/container/ProjectDetailContainer';
import CreateProjectContainer from './components/container/CreateProjectContainer';
import ProjectListContainer from './components/container/ProjectListContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from './util/cookie';
import { loggedIn } from './components/module/user';
import MyPageContainer from './components/container/MyPageContainer';

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector(state=> state.user.loginUser.isLogged);
  useEffect(()=>{
    if(getCookie('userId')){
      dispatch(loggedIn());
    }
    //eslint-disable-next-line
  },[isLogged])
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
