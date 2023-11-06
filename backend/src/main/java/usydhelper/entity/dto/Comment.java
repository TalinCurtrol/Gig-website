package usydhelper.entity.dto;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @Column(name = "id")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    // the id of the user who sent this comment
    @Column(name = "user_id")
    private Integer userId;

    // the id of request where this comment is in
    @Column(name = "request_id")
    private Integer requestId;

    // the id of the comment which this comment is reply to
    @Column(name = "comment_id")
    private Integer commentId;

    @Column(name = "commented_time")
    private Date commentedTime;

    // content of the comment
    @Column(name = "content")
    private String content;
}
