import './App.scss';
import Footer from './components/include/Footer';
import Header from './components/include/Header';
import MainIndex from './components/main/MainIndex';
import { Routes, Route } from 'react-router-dom';
import SignUpContainer from './components/container/SignUpContainer';
import LoginContainer from './components/container/LoginContainer';
import ProjectDetail from './components/detail/ProjectDetail';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<MainIndex />} />
        <Route path='/signup' element={<SignUpContainer />} />
        <Route path='/login' element={<LoginContainer />} />
        <Route path='projectDetail/:id' element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
