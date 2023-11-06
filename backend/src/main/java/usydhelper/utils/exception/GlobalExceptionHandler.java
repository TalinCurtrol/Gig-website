package usydhelper.utils.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import usydhelper.utils.result.R;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HelperException.class)
    @ResponseBody
    public R error(HelperException e) {
        return R.error().message(e.getMessage()).code(e.getCode());
    }
}
