import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TaskItem from './Dashboard/TaskItem';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/project.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects, tasks, addTask } = useContext(AuthContext);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'backlog',
    dueDate: '',
    tags: '',
    assignedTo: '',
  });
  const [showModal, setShowModal] = useState(false);

  const project = projects.find((p) => p.id === id);
  const projectTasks = tasks.filter((task) => task.project === id);

  const handleAddTask = () => {
    if (!newTask.name) return;
    addTask({
      id: Date.now().toString(),
      ...newTask,
      project: id,
      createdAt: new Date().toISOString(),
    });
    setNewTask({
      name: '',
      description: '',
      status: 'backlog',
      dueDate: '',
      tags: '',
      assignedTo: '',
    });
    setShowModal(false);
  };

  if (!project) {
    return <div className="project-not-found">Project not found</div>;
  }

  return (
    <div className="project-details-container">
      <div className="project-header">
        <Link to="/projects" className="back-link">
          <FaArrowLeft /> Back to Projects
        </Link>
        <h2>{project.name}</h2>
        <p className="project-description">{project.description}</p>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Task
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Task to Project</h3>
            <div className="form-group">
              <label>Task Name</label>
              <input
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                placeholder="Enter task name"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Enter task description"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="backlog">Backlog</option>
                <option value="discussion">In Discussion</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleAddTask}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="project-tasks">
        {projectTasks.length > 0 ? (
          projectTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <div className="empty-state">
            <p>No tasks in this project yet. Add your first task!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;