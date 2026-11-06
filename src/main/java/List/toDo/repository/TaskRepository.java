package List.toDo.repository;

import List.toDo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Search tasks by title containing the keyword (case-insensitive)
    List<Task> findByTitleContainingIgnoreCase(String keyword);
}
