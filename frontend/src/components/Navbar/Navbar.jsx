import React from 'react';
import { ListTodo, Rocket, Plus, Trash2 } from 'lucide-react';

export default function Navbar({ taskCount, onAddTask, onClearTasks, hasTasks }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">
            <ListTodo size={26} />
          </div>
          <div>
            <h1 className="brand-title">ToDo Manager</h1>
            <p className="brand-subtitle">Spring Boot + React</p>
          </div>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Badge */}
          <div className="badge-pill" title="Total tasks in database">
            <Rocket size={16} className="badge-rocket" />
            <span>
              <strong>{taskCount}</strong> Tasks found
            </span>
          </div>

          <button className="btn-primary" onClick={onAddTask}>
            <Plus size={18} />
            Add Task
          </button>

          {hasTasks && (
            <button
              className="btn-danger-outline"
              onClick={onClearTasks}
              title="Clear all tasks"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
