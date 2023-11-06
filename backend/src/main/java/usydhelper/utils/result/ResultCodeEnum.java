package usydhelper.utils.result;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum ResultCodeEnum {

    SUCCESS(true, 20000,"success"),
    UNKNOWN_ERROR(false, 20001, "unknown error"),
    BAD_SQL_GRAMMAR(false, 20002, "bad sql grammer"),
    JSON_PARSE_ERROR(false, 20003, "json parse error"),
    PARAM_ERROR(false, 20004, "parameter error");

    // if the request is success
    private Boolean success;
    // result status code
    private Integer code;
    // extra information
    private String message;

    ResultCodeEnum(Boolean success, Integer code, String message) {
        this.success = success;
        this.code = code;
        this.message = message;
    }
}
