import React from 'react';
import { Check, Edit2, Trash2 } from 'lucide-react';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-main">
        {/* Cut Mark Checkbox */}
        <button
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggle(task.id)}
          title={task.completed ? 'Mark as active' : 'Mark as done (Cut mark)'}
        >
          {task.completed && <Check size={16} strokeWidth={3} />}
        </button>

        <div className="task-content">
          <div className="task-title-row">
            <h4 className={`task-title ${task.completed ? 'cut-mark' : ''}`}>
              {task.title}
            </h4>
            <span className={`status-pill ${task.completed ? 'pill-done' : 'pill-active'}`}>
              {task.completed ? 'Completed' : 'Active'}
            </span>
          </div>

          {task.body && (
            <p className={`task-body ${task.completed ? 'body-muted' : ''}`}>
              {task.body}
            </p>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-icon"
          onClick={() => onEdit(task)}
          title="Edit"
        >
          <Edit2 size={16} />
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
