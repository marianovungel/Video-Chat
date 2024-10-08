import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, WellCome, Notification, Profile, Feed, Grup, MyChat, NovoArtigo, Editor } from './pages/index';
import { Menu, Notify } from './components/index';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';
import { useEffect } from 'react';
import AppVideo from './pages/Video/AppVideo';

function App() {


  const { 
    currentUser, 
    // isLoading, 
    fetchUserInfo 
  } = useUserStore()

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      fetchUserInfo(user?.uid)
    })

    return()=>{
      unSub();
    }
  }, [fetchUserInfo])

  // if(isLoading) return <div className='loading'>Processando...</div>

  return (
      <Router>
        <Menu />
        <Notify />
        <Routes> 
          <Route path="/" element={ <WellCome /> } exact />
          <Route path="/grupo" element={ <Grup /> } exact />
          <Route path="/feed" element={  <Feed />  } exact />
          <Route path="/notification" element={ <Notification />  } exact />
          <Route path="/profile" element={ <Profile />  } exact />
          <Route path="/novo-artigo" element={ <NovoArtigo />  } exact />
          <Route path="/editor" element={ <Editor />  } exact />
          <Route path="/chat" element={ currentUser ? <MyChat />  : <Login /> } exact />
          <Route path="/video" element={ currentUser ? <AppVideo />  : <Login /> } exact />
          <Route path="/login" element={currentUser ? <WellCome />  : <Login />} exact />
        </Routes>
      </Router>
  );
}

export default App;