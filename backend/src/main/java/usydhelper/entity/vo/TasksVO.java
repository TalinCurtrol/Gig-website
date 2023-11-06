package usydhelper.entity.vo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TasksVO {
    private List<NewTaskVo> newTasks = new ArrayList<>();
    private List<OngoingTaskVo> ongoingTasks = new ArrayList<>();
    private List<CompleteTaskVo> completedTasks = new ArrayList<>();
}
