package usydhelper.utils;

import org.junit.jupiter.api.Test;
import usydhelper.utils.converter.StringDateConverter;

import java.util.Date;

public class ConverterTest {

    @Test
    public void test() {
        String s = StringDateConverter.dateToString(new Date());
        System.out.println(s);
        Date date = StringDateConverter.stringToDate("21/09/2001");
        System.out.println(date);
    }
}
