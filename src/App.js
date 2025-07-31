import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Projects from './components/Dashboard/Projects';
import TaskBoard from './components/Dashboard/TaskBoard';
import ProjectDetails from './components/ProjectDetails';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/projects" 
                element={
                  <PrivateRoute>
                    <Projects />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/task-board" 
                element={
                  <PrivateRoute>
                    <TaskBoard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/projects/:id" 
                element={
                  <PrivateRoute>
                    <ProjectDetails />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Navigate to="/projects" />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;