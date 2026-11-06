import React, { useState, useEffect } from 'react';
import { taskApi } from './services/taskApi';
import Navbar from './components/Navbar/Navbar';
import TaskList from './components/Tasks/TaskList';
import TaskModal from './components/Tasks/TaskModal';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load all tasks and count from backend
  const loadData = async (query = searchQuery) => {
    setIsLoading(true);
    setError('');
    try {
      const [fetchedTasks, count] = await Promise.all([
        taskApi.getAllTasks(query),
        taskApi.getTaskCount(),
      ]);
      setTasks(fetchedTasks);
      setTaskCount(count);
    } catch (err) {
      console.error(err);
      setError('Cannot connect to backend. Please make sure Spring Boot is running on port 8080.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    loadData(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    loadData('');
  };

  // Add / Edit Task Modal openers
  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Save Task (Create or Update)
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, taskData);
      } else {
        await taskApi.createTask(taskData);
      }
      setIsModalOpen(false);
      loadData(searchQuery);
    } catch (err) {
      alert(err.message || 'Error saving task');
    }
  };

  // Toggle Cut Mark (Done / Active)
  const handleToggleTask = async (id) => {
    try {
      const updated = await taskApi.toggleCutMark(id);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: updated.completed } : t))
      );
    } catch (err) {
      alert(err.message || 'Error toggling task');
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskApi.deleteTask(id);
      loadData(searchQuery);
    } catch (err) {
      alert(err.message || 'Error deleting task');
    }
  };

  // Clear All Tasks
  const handleClearTasks = async () => {
    if (!window.confirm('Are you sure you want to delete ALL tasks?')) return;
    try {
      await taskApi.clearAllTasks();
      loadData(searchQuery);
    } catch (err) {
      alert(err.message || 'Error clearing tasks');
    }
  };

  return (
    <div className="app-layout">
      {/* 1. Header & Navigation */}
      <Navbar
        taskCount={taskCount}
        onAddTask={handleOpenAddModal}
        onClearTasks={handleClearTasks}
        hasTasks={tasks.length > 0}
      />

      {/* 2. Main Content & Task List */}
      <main className="main-content">
        <TaskList
          tasks={tasks}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onClearSearch={handleClearSearch}
          onToggle={handleToggleTask}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTask}
          onAddTask={handleOpenAddModal}
          isLoading={isLoading}
          error={error}
          onRetry={() => loadData(searchQuery)}
        />
      </main>

      {/* 3. Add / Edit Modal Dialog */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}
