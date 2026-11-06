package List.toDo;

import List.toDo.controller.TaskController;
import List.toDo.model.Task;
import List.toDo.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ToDoApplicationTests {

    @Autowired
    private TaskController taskController;

    @Autowired
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskService.clearAllTasks();
    }

    @Test
    void testCreateAndFetchTasks() {
        // 1. Create a task via controller
        Task task = new Task("Practice Spring MVC", "Understand Model, View, Controller");
        BindingResult bindingResult = new BeanPropertyBindingResult(task, "task");

        ResponseEntity<?> response = taskController.addTask(task, bindingResult);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Task createdTask = (Task) response.getBody();
        assertNotNull(createdTask);
        assertNotNull(createdTask.getId());
        assertEquals("Practice Spring MVC", createdTask.getTitle());
        assertFalse(createdTask.isCompleted(), "New task should not be completed");

        // 2. Fetch all tasks
        ResponseEntity<List<Task>> allTasksResponse = taskController.getAllTasks(null);
        assertEquals(HttpStatus.OK, allTasksResponse.getStatusCode());
        assertEquals(1, allTasksResponse.getBody().size());

        // 3. Check count badge
        ResponseEntity<?> countResponse = taskController.getTaskCount();
        Map<?, ?> countMap = (Map<?, ?>) countResponse.getBody();
        assertEquals(1L, countMap.get("count"));
    }

    @Test
    void testToggleCutMark() {
        Task task = taskService.addTask(new Task("Exercise", "Go for a morning walk"));
        assertFalse(task.isCompleted());

        // Toggle on (cut mark applied)
        ResponseEntity<?> toggleResponse1 = taskController.toggleCutMark(task.getId());
        Task updated1 = (Task) toggleResponse1.getBody();
        assertTrue(updated1.isCompleted(), "Task should now have cut mark (completed = true)");

        // Toggle off (cut mark removed)
        ResponseEntity<?> toggleResponse2 = taskController.toggleCutMark(task.getId());
        Task updated2 = (Task) toggleResponse2.getBody();
        assertFalse(updated2.isCompleted(), "Task cut mark should be removed");
    }

    @Test
    void testSearchFilter() {
        taskService.addTask(new Task("Learn Spring Boot", "Backend fundamentals"));
        taskService.addTask(new Task("Buy groceries", "Milk, bread"));

        // Search matching "spring"
        ResponseEntity<List<Task>> searchResponse = taskController.getAllTasks("spring");
        assertEquals(1, searchResponse.getBody().size());
        assertEquals("Learn Spring Boot", searchResponse.getBody().get(0).getTitle());
    }

    @Test
    void testUpdateAndDeleteTask() {
        Task task = taskService.addTask(new Task("Original Title", "Original Body"));

        // Update task
        Task updatedData = new Task("New Title", "New Body");
        BindingResult bindingResult = new BeanPropertyBindingResult(updatedData, "task");
        ResponseEntity<?> updateResponse = taskController.updateTask(task.getId(), updatedData, bindingResult);
        assertEquals(HttpStatus.OK, updateResponse.getStatusCode());

        Task saved = (Task) updateResponse.getBody();
        assertEquals("New Title", saved.getTitle());
        assertEquals("New Body", saved.getBody());

        // Delete task
        ResponseEntity<?> deleteResponse = taskController.deleteTask(task.getId());
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());

        // Verify task is deleted
        assertEquals(0, taskService.getAllTasks().size());
    }
}
