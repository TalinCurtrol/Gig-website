package usydhelper.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import usydhelper.controller.TranslationController;
import usydhelper.entity.vo.TranslationVO;
import usydhelper.utils.result.R;

@SpringBootTest
public class TranslationTest {

    @Autowired
    TranslationController controller;

    @Test
    public void test() {
        TranslationVO vo = new TranslationVO();
        vo.setSentence("你好");
        vo.setTargetLanguage("en");
        R r = controller.translateSentence(vo);
        Assert.isTrue(r.getSuccess(), "translation fail");
    }
}
