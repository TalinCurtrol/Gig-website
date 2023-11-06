package usydhelper.entity.vo;
import lombok.Data;

import java.util.Date;

@Data
public class AdminPostVO {
    private int id;
    private int publisherId;
    private Integer accepterId;
    private String state;
    private String reward;
    private String title;
    private String description;
    private String location;
    private Date createTime;
    private Date expiredTime;
}
