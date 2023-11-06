package usydhelper.utils;

import org.apache.http.util.Asserts;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import usydhelper.utils.result.R;
import usydhelper.utils.result.ResultCodeEnum;

import java.util.HashMap;
import java.util.Map;

public class RTest {

    @Test
    public void test() {
        R r = new R();
        r.setSuccess(true);
        r.setCode(123);
        r.setMessage("123");
        r.data("123", "456");
        Map<String, Object> map = new HashMap<>();
        map.put("123", "456");
        r.data(map);
        Assertions.assertSame(r.getCode(), 123);
        Assertions.assertSame(r.getMessage(), "123");
        Assertions.assertSame(r.getSuccess(), true);
        Assertions.assertSame(r.getData(), map);
    }

    @Test
    public void test2() {
        R r = R.ok();
        String s = r.toString();
        r.code(400);
        r.success(false);
        int i = r.hashCode();
        r.setResult(ResultCodeEnum.BAD_SQL_GRAMMAR);
        R r1 = R.ok();
        R r2 = R.ok();
        r1.equals(r2);
    }
}
