package usydhelper.utils.exception;

import lombok.Data;
import usydhelper.utils.result.ResultCodeEnum;

@Data
public class HelperException extends RuntimeException {

    private Integer code;

    public HelperException(String message, Integer code) {
        super(message);
        this.code = code;
    }

    public HelperException(ResultCodeEnum resultCodeEnum) {
        super(resultCodeEnum.getMessage());
        this.code = resultCodeEnum.getCode();
    }

    @Override
    public String toString() {
        return "HelperException{" +
                "code=" + code +
                ", message=" + this.getMessage() +
                '}';
    }
}
