package usydhelper.entity.dto;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "state_values")
public class StateValues {
    @Id
    @Column(name = "state_key")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer stateKey;

    @Column(name = "state_value")
    private String stateValue;
}
