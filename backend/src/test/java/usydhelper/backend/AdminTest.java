package usydhelper.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import usydhelper.controller.AdminController;
import usydhelper.entity.vo.AdminVO;
import usydhelper.entity.vo.BlockedUserVO;
import usydhelper.utils.result.R;

@SpringBootTest
public class AdminTest {

    @Autowired
    AdminController adminController;

    @Test
    public void testAdminLoginPositive() {
        AdminVO vo = new AdminVO();
        vo.setAdminName("LashaunHaag");
        vo.setPassword("11111111");
        R r = adminController.login(vo);
        Assert.isTrue(r.getSuccess(), "testAdminLoginPositive failed");
    }

    @Test
    public void testGet() {
        R allUsers = adminController.getAllUsers();
        R allposts = adminController.getAllposts();
        R allBlockedUsers = adminController.getAllBlockedUsers();
        R comments = adminController.getComments();
        Assert.isTrue(allUsers.getSuccess(), "testGet failed");
        Assert.isTrue(allposts.getSuccess(), "testGet failed");
        Assert.isTrue(allBlockedUsers.getSuccess(), "testGet failed");
        Assert.isTrue(comments.getSuccess(), "testGet failed");
    }

    @Test
    public void testSearch() {
        R r1 = adminController.searchUserByString("Louie Mohlke");
        Assert.isTrue(r1.getSuccess(), "testSearch fail");
        R r2 = adminController.getPostByKeyword("Help me with move");
        Assert.isTrue(r2.getSuccess(), "testSearch fail");
        R r3 = adminController.getCommentsByKeyword("Can I join if I am not a native French speaker?");
        Assert.isTrue(r3.getSuccess(), "testSearch fail");
    }

    @Test
    public void testGetById() {
        R r1 = adminController.getCommentsByPostId(1);
        R r2 = adminController.getCommentsByUserId(1);
        Assert.isTrue(r1.getSuccess(), "testGetById fail");
        Assert.isTrue(r2.getSuccess(), "testGetById fail");
    }

    @Test
    public void testBlock() {
        BlockedUserVO vo = new BlockedUserVO();
        vo.setUserid(100);
        vo.setBlockState("forever");
        R r = adminController.banAUser(vo);
        Assert.isTrue(r.getSuccess(), "testBlock fail");
        vo.setUserid(101);
        r = adminController.suspendAUser(vo);
        Assert.isTrue(r.getSuccess(), "testBlock fail");

        R r1 = adminController.releaseAUser(100);
        Assert.isTrue(r1.getSuccess(), "testBlock fail");

        R r2 = adminController.checkUserBlocked(1);
        Assert.isTrue(r2.getSuccess(), "testBlock fail");
    }

}
