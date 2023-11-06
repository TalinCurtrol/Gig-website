package usydhelper.entity.dto;

import lombok.Getter;

@Getter
public enum States {
    NEW(0, "New Task"),
    ON_GOING(1, "Ongoing Task"),
    COMPLETED(2, "Completed");

    private Integer key;
    private String message;

    States(Integer key, String message) {
        this.key = key;
        this.message = message;
    }
}
