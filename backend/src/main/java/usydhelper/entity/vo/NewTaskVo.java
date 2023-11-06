package usydhelper.entity.vo;

import lombok.Data;

import java.util.Date;

@Data
public class NewTaskVo {
    private Integer id;
    private String title;
    private Date createdTime;
    private String description;
    private String reward;
    private String location;
    private Boolean markerIsVisible;
}
