package usydhelper.entity.dto;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "blocked_users")
public class BlockedUser {
    @Id
    @Column(name = "user_id")

    private Integer userid;

    @Column(name = "block_state")
    private String blockState;
}
