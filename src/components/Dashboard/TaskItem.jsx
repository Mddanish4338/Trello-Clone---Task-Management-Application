import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaEllipsisH, FaCalendarAlt, FaUser, FaTrash, FaEdit } from 'react-icons/fa';
import { MdLabelImportant } from 'react-icons/md';
import '../../styles/dashboard.css';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const { updateTaskStatus } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    if (typeof onEdit === 'function') {
      onEdit(task);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    if (typeof onDelete === 'function') {
      onDelete(task.id);
    }
  };

  const handleStatusChange = (e) => {
    e.stopPropagation();
    updateTaskStatus(task.id, e.target.value);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className="task-item" onClick={() => setShowMenu(false)}>
      <div className="task-header">
        <h4 className="task-title">{task.name}</h4>
        <div className="task-menu-container">
          <button 
            className="task-menu-btn"
            onClick={handleMenuToggle}
            aria-label="Task menu"
          >
            <FaEllipsisH />
          </button>
          
          {showMenu && (
            <div className="task-dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <button 
                className="dropdown-item edit-item"
                onClick={handleEditClick}
              >
                <FaEdit className="dropdown-icon" />
                <span>Edit Task</span>
              </button>
              <button 
                className="dropdown-item delete-item"
                onClick={handleDeleteClick}
              >
                <FaTrash className="dropdown-icon" />
                <span>Delete Task</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-meta-container">
        {task.dueDate && (
          <div className="task-meta">
            <FaCalendarAlt className="meta-icon" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
        
        {task.assignedTo && (
          <div className="task-meta">
            <FaUser className="meta-icon" />
            <span>{task.assignedTo}</span>
          </div>
        )}
        
        {task.tags && (
          <div className="task-meta">
            <MdLabelImportant className="meta-icon" />
            <span>{task.tags}</span>
          </div>
        )}
      </div>
      
      <div className="task-footer">
        <select
          className="status-select"
          value={task.status}
          onChange={handleStatusChange}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="backlog">Backlog</option>
          <option value="discussion">In Discussion</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskItem;