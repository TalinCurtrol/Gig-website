package usydhelper.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import usydhelper.controller.PendingAcceptersController;
import usydhelper.entity.vo.AcceptApplicantVO;
import usydhelper.utils.result.R;

@SpringBootTest
public class PendingAccepterTest {

    @Autowired
    PendingAcceptersController controller;

    @Test
    public void testGetAllApplicants() {
        R allApplicants = controller.getAllApplicants(1);
        Assert.isTrue(allApplicants.getSuccess(), "testGetAllApplicants failed");
    }

    @Test
    public void testAcceptApplicant() {
        AcceptApplicantVO vo = new AcceptApplicantVO();
        vo.setPostId(1);
        vo.setUserId(1);
        R r = controller.acceptApplicant(vo);
        Assert.isTrue(r.getSuccess(), "testAcceptApplicant failed");
    }
}
