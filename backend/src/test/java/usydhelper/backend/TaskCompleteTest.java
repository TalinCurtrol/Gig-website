package usydhelper.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import usydhelper.controller.ConfirmTaskCompleteController;
import usydhelper.entity.vo.ConfirmVo;
import usydhelper.utils.result.R;

@SpringBootTest
public class TaskCompleteTest {

    @Autowired
    ConfirmTaskCompleteController controller;

    @Test
    public void testAccepterCompleteTask() {
        ConfirmVo vo = new ConfirmVo();
        vo.setPostId(1);
        vo.setUserId(1);
        R r = controller.accepterCompleteTask(vo);
        R r1 = controller.confirmComplete(vo);
        Assert.isTrue(r.getSuccess(), "testAccepterCompleteTask fail");
        Assert.isTrue(r1.getSuccess(), "testAccepterCompleteTask fail");
    }

}
