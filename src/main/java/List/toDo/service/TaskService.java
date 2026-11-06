package List.toDo.service;

import List.toDo.model.Task;
import List.toDo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // 1. Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // 2. Search tasks by title
    public List<Task> searchTasks(String keyword) {
        if (keyword != null && !keyword.trim().isEmpty()) {
            return taskRepository.findByTitleContainingIgnoreCase(keyword.trim());
        }
        return taskRepository.findAll();
    }

    // 3. Find one task by its ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // 4. Add a new task
    public Task addTask(Task task) {
        task.setCompleted(false); // new task starts uncompleted (no cut mark)
        return taskRepository.save(task);
    }

    // 5. Update an existing task (title and body)
    public Task updateTask(Long id, Task updatedTask) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        task.setTitle(updatedTask.getTitle());
        task.setBody(updatedTask.getBody());
        return taskRepository.save(task);
    }

    // 6. Toggle cut mark (mark as done / undo done)
    public Task toggleCutMark(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }

    // 7. Delete one task by its ID
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // 8. Delete all tasks ("Clear tasks" button)
    public void clearAllTasks() {
        taskRepository.deleteAll();
    }

    // 9. Count total tasks (for "🚀 X Tasks found")
    public long getTaskCount() {
        return taskRepository.count();
    }
}
