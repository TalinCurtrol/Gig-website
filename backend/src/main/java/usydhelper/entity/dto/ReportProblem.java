package usydhelper.entity.dto;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "report_problems")
public class ReportProblem {
    @Id
    @Column(name = "id")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "post_id")
    private Integer postId;

    @Column(name = "description")
    private String description;

    @Column(name = "state")
    private String state;
}
