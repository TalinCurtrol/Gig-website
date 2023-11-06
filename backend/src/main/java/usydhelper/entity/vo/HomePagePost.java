package usydhelper.entity.vo;

import lombok.Data;

import java.util.Date;

/**
 * information for Postcard
 */
@Data
public class HomePagePost {
    private Integer id;
    private String title;
    private Date createdTime;
    private String description;
    private String publisher;
    private Boolean isApplied;
}
