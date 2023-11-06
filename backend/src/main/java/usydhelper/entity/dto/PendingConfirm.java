package usydhelper.entity.dto;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "pending_confirm")
public class PendingConfirm {
    @Id
    @Column(name = "id")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "post_id")
    private Integer postId;
}
