package usydhelper.entity.vo;

import lombok.Data;

import java.util.Date;

@Data
public class OngoingTaskVo {
    private Integer id;
    private String title;
    private Date createdTime;
    private String description;
    private String publisher;
    private Boolean isOwner;
    private Boolean didSentComplete;
    private Boolean didReceiveComplete;
}
