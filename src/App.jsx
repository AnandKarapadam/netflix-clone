import React from 'react';
import Home from './pages/Home/Home';
import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { ToastContainer} from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MovieDetails from './pages/Moviedetails/MovieDetails';
import MyList from './pages/MyList/MyList';

function App() {
  return (
    <>
    <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          
          }/>
        
        <Route path='/player/:id' element={
          <ProtectedRoute>
            <Player/>
          </ProtectedRoute>
          } />
          <Route path='/movie/:id' element={
            <ProtectedRoute>
              <MovieDetails/> 
            </ProtectedRoute>
          }/>
          <Route path='/my-list' element={
            <ProtectedRoute>
              <MyList/>
            </ProtectedRoute>  
          }
          />
      </Routes>
    </>
  )
}

export default App
