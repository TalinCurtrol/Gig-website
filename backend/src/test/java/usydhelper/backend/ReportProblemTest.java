package usydhelper.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import usydhelper.controller.ReportProblemController;
import usydhelper.entity.dto.ReportProblem;
import usydhelper.utils.result.R;

@SpringBootTest
public class ReportProblemTest {

    @Autowired
    ReportProblemController controller;

    @Test
    public void testReport() {
        ReportProblem problem = new ReportProblem();
        problem.setPostId(1);
        problem.setUserId(1);
        problem.setDescription("sensitive");
        R r = controller.reportProblem(problem);
        Assert.isTrue(r.getSuccess(), "testReport fail");
    }

    @Test
    public void testReportList() {
        R r = controller.showAllReport();
        Assert.isTrue(r.getSuccess(), "testReportList fail");
    }

    @Test
    public void testSearchReport() {
        R r = controller.searchAReport("1");
        Assert.isTrue(r.getSuccess(), "testSearchReport fail");
    }

    @Test
    public void testReportDone() {
        R r = controller.setReportDone(1);
        Assert.isTrue(r.getSuccess(), "testReportDone fail");
    }

    @Test
    public void testSetReportState() {
        R r = controller.reportProblem(new ReportProblem());
        Assert.isTrue(r.getSuccess(), "testSetReportState fail");
    }

}
