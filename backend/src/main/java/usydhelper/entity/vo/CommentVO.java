package usydhelper.entity.vo;
import lombok.Data;

import java.util.Date;

@Data
public class CommentVO {
    private int id;
    private int userId;// who sent comment
    private int requestId;
    private int commentUserId;// who is replied
    private Date commentedTime;
    private String content;
}
