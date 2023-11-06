package usydhelper.utils;

import org.junit.jupiter.api.Test;
import usydhelper.utils.encrypt.MD5;

public class MD5Tests {

    @Test
    public void testEncrypted() {
        System.out.println(MD5.encrypt("123"));
    }
}
