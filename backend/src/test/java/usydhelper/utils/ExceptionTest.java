package usydhelper.utils;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import usydhelper.utils.exception.HelperException;
import usydhelper.utils.result.ResultCodeEnum;

public class ExceptionTest {

    @Test
    public void test1() {
        try {
            throw new HelperException("123", 123);
        } catch (HelperException e) {
            Assertions.assertSame(e.getMessage(), "123");
            Assertions.assertSame(e.getCode(), 123);
            String s = e.toString();
            int i = e.hashCode();
            e.setCode(100);
        }
    }

    @Test
    public void test2() {
        try {
            throw new HelperException(ResultCodeEnum.BAD_SQL_GRAMMAR);
        } catch (HelperException e) {
            Assertions.assertSame(e.getMessage(), ResultCodeEnum.BAD_SQL_GRAMMAR.getMessage());
            Assertions.assertSame(e.getCode(), ResultCodeEnum.BAD_SQL_GRAMMAR.getCode());
            String s = e.toString();
            int i = e.hashCode();
            e.setCode(100);
        }
    }
}
