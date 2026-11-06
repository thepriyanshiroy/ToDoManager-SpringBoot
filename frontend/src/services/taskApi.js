const API_BASE = '/api/tasks';

export const taskApi = {
  // 1. Get all tasks (or search by keyword)
  async getAllTasks(search = '') {
    const url = search ? `${API_BASE}?search=${encodeURIComponent(search)}` : API_BASE;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },

  // 2. Get task count for badge
  async getTaskCount() {
    const res = await fetch(`${API_BASE}/count`);
    if (!res.ok) throw new Error('Failed to fetch count');
    const data = await res.json();
    return data.count;
  },

  // 3. Add a new task
  async createTask(task) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create task');
    return data;
  },

  // 4. Update task (title & body)
  async updateTask(id, task) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update task');
    return data;
  },

  // 5. Toggle cut mark (completion status)
  async toggleCutMark(id) {
    const res = await fetch(`${API_BASE}/${id}/toggle`, {
      method: 'PATCH',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to toggle task');
    return data;
  },

  // 6. Delete a single task
  async deleteTask(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return res.json();
  },

  // 7. Clear all tasks
  async clearAllTasks() {
    const res = await fetch(API_BASE, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to clear tasks');
    return res.json();
  },
};
