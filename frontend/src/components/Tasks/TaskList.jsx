import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Search, XCircle, ListTodo, Plus, AlertCircle, RefreshCw } from 'lucide-react';

export default function TaskList({
  tasks,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onToggle,
  onEdit,
  onDelete,
  onAddTask,
  isLoading,
  error,
  onRetry,
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // Filter tasks based on the active tab
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="task-list-wrapper">
      {/* Backend connection warning if server is offline */}
      {error && (
        <div className="error-alert">
          <AlertCircle size={20} />
          <div className="error-alert-content">
            <strong>Server Warning:</strong> {error}
          </div>
          {onRetry && (
            <button className="btn-retry" onClick={onRetry}>
              <RefreshCw size={14} /> Retry
            </button>
          )}
        </div>
      )}

      {/* Controls: Search Bar & Filter Tabs */}
      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={onClearSearch}
              title="Clear search"
            >
              <XCircle size={16} />
            </button>
          )}
        </div>

        <div className="filter-tabs">
          <button
            className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            className={`tab-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button
            className={`tab-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {/* Main Task List Content */}
      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <ListTodo size={48} />
          </div>
          <h3>
            {searchQuery
              ? `No tasks found matching "${searchQuery}"`
              : filter === 'completed'
              ? 'No completed tasks yet'
              : filter === 'active'
              ? 'All tasks are done! 🎉'
              : 'No tasks yet'}
          </h3>
          <p>
            {searchQuery
              ? 'Try searching with another word.'
              : 'Get started by creating your first task!'}
          </p>
          {!searchQuery && (
            <button className="btn-primary mt-3" onClick={onAddTask}>
              <Plus size={18} /> Add Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
