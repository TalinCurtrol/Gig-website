package usydhelper.entity.vo;

import lombok.Data;

import java.util.Date;

@Data
public class CompleteTaskVo {
    private Integer id;
    private String title;
    private Date createdTime;
    private String description;
    private String publisher;
    private Boolean isOwner;
}
