package usydhelper.entity.dto;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "post")
public class Post {
    @Id
    @Column(name = "id")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "publisher_id")
    private Integer publisherId;

    @Column(name = "accepter_id")
    private Integer accepterId;

    @Column(name = "state_id")
    private Integer stateId;

    @Column(name = "reward")
    private String reward;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "created_time")
    private Date createdTime;

    @Column(name = "expired_time")
    private Date expiredTime;
  
    @Column(name = "location")
    private String location;
  
    @Column(name = "marker_is_visible")
    private Integer markerIsVisible;

}
