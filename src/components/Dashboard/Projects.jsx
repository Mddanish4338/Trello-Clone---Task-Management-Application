import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaPlus, FaTasks, FaSearch, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../styles/dashboard.css';

const Projects = () => {
  const { projects, addProject } = useContext(AuthContext);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProject = () => {
    if (!newProject.name.trim()) return;
    addProject({
      id: Date.now().toString(),
      ...newProject,
      createdAt: new Date().toISOString()
    });
    setNewProject({ name: '', description: '' });
    setShowModal(false);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-container">
      <div className="projects-header">
        <div className="header-content">
          <h1 className="projects-title">My Projects</h1>
          <p className="projects-subtitle">Manage your work and track progress</p>
        </div>
        
        <div className="projects-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="create-project-btn"
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="plus-icon" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="project-modal">
            <div className="modal-header">
              <h3>Create New Project</h3>
              <button 
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Project Name *</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="e.g. Marketing Campaign"
                  className="form-input"
                  autoFocus
                />
                {!newProject.name.trim() && (
                  <p className="form-error">Project name is required</p>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Describe your project..."
                  className="form-textarea"
                  rows="4"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="create-btn"
                onClick={handleAddProject}
                disabled={!newProject.name.trim()}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <Link 
              to={`/projects/${project.id}`} 
              key={project.id} 
              className="project-card"
            >
              <div className="card-header">
                <h3 className="project-name">{project.name}</h3>
                <div className="project-badge">Active</div>
              </div>
              <p className="project-description">
                {project.description || 'No description provided'}
              </p>
              <div className="card-footer">
                <div className="task-count">
                  <FaTasks className="task-icon" />
                  <span>0 Tasks</span>
                </div>
                <div className="project-date">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-content">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
              alt="No projects" 
              className="empty-image"
            />
            <h3>No projects found</h3>
            <p>Get started by creating your first project</p>
            <button 
              className="create-btn"
              onClick={() => setShowModal(true)}
            >
              <FaPlus /> Create Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;