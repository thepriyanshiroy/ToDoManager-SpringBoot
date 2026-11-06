package List.toDo.controller;

import List.toDo.model.Task;
import List.toDo.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*") // Allows React frontend to connect without CORS errors
@Tag(name = "Tasks", description = "Operations for managing To-Do tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // 1. Get all tasks (or search tasks by keyword using ?search=...)
    @Operation(summary = "Get all tasks or search tasks", description = "Retrieves all tasks or filters tasks by title/body matching the search query.")
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(
            @Parameter(description = "Optional search keyword") @RequestParam(required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(taskService.searchTasks(search));
        }
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // 2. Get one task by ID
    @Operation(summary = "Get task by ID", description = "Retrieves details of a specific task by its ID.")
    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(
            @Parameter(description = "Task ID") @PathVariable Long id) {
        return taskService.getTaskById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Task not found with id: " + id)));
    }

    // 3. Add a new task (validates input for the dialog box)
    @Operation(summary = "Create a new task", description = "Creates a new task. Validates that the title is provided and under 100 characters.")
    @PostMapping
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task, BindingResult result) {
        if (result.hasErrors()) {
            String errorMessage = result.getFieldError() != null
                    ? result.getFieldError().getDefaultMessage()
                    : "Invalid task input";
            return ResponseEntity.badRequest().body(Map.of("error", errorMessage));
        }
        Task createdTask = taskService.addTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    // 4. Update an existing task (title and body)
    @Operation(summary = "Update a task", description = "Updates title and body for an existing task by its ID.")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(
            @Parameter(description = "Task ID") @PathVariable Long id,
            @Valid @RequestBody Task task,
            BindingResult result) {
        if (result.hasErrors()) {
            String errorMessage = result.getFieldError() != null
                    ? result.getFieldError().getDefaultMessage()
                    : "Invalid task input";
            return ResponseEntity.badRequest().body(Map.of("error", errorMessage));
        }
        try {
            Task updated = taskService.updateTask(id, task);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
        }
    }

    // 5. Toggle cut mark (mark done / undo done)
    @Operation(summary = "Toggle task completion", description = "Toggles the completion status (cut mark / strikethrough) of a task.")
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<?> toggleCutMark(
            @Parameter(description = "Task ID") @PathVariable Long id) {
        try {
            Task toggled = taskService.toggleCutMark(id);
            return ResponseEntity.ok(toggled);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
        }
    }

    // 6. Delete a single task
    @Operation(summary = "Delete a task", description = "Permanently removes a task by its ID.")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(
            @Parameter(description = "Task ID") @PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok(Map.of("message", "Task deleted successfully"));
    }

    // 7. Clear all tasks ("Clear tasks" button)
    @Operation(summary = "Clear all tasks", description = "Permanently deletes all tasks in the database.")
    @DeleteMapping
    public ResponseEntity<?> clearAllTasks() {
        taskService.clearAllTasks();
        return ResponseEntity.ok(Map.of("message", "All tasks cleared successfully"));
    }

    // 8. Get task count for badge ("🚀 X Tasks found")
    @Operation(summary = "Get task count", description = "Retrieves the total count of active tasks for badge counters.")
    @GetMapping("/count")
    public ResponseEntity<?> getTaskCount() {
        Map<String, Object> response = new HashMap<>();
        response.put("count", taskService.getTaskCount());
        return ResponseEntity.ok(response);
    }
}
