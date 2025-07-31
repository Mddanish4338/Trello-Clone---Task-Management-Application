import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const register = (name, email, password) => {
    setUser({ name, email });
    return true;
  };

  const login = (email, password) => {
    // In a real app, you would verify credentials
    setUser({ name: "Demo User", email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      projects, 
      tasks, 
      register, 
      login, 
      logout, 
      addProject, 
      addTask,
      updateTaskStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};