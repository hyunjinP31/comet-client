import './App.scss';
import Footer from './components/include/Footer';
import Header from './components/include/Header';
import MainIndex from './components/main/MainIndex';
import { Routes, Route } from 'react-router-dom';
import SignUpContainer from './components/container/SignUpContainer';
import LoginContainer from './components/container/LoginContainer';
import ProjectDetailContainer from './components/container/ProjectDetailContainer';
import CreateProjectContainer from './components/container/CreateProjectContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<MainIndex />} />
        <Route path='/signup' element={<SignUpContainer />} />
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/projectdetail/:id' element={<ProjectDetailContainer />} />
        <Route path='/createproject' element={<CreateProjectContainer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
