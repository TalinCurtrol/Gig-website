package usydhelper.entity.vo;

import lombok.Data;

import java.util.Date;

@Data
public class PostDetailVO {
    // post id
    private Integer id;
    private String title;
    private String description;
    // user id of publisher
    private Integer publisherId;
    // name of publisher
    private String publisher;
    // user id of accepter
    private Integer accepterId;
    // name of accepter
    public String accepter;
    private String state;
    private String reward;
    private Date createdTime;
    private String location;
    private Integer markerIsVisible;
}
