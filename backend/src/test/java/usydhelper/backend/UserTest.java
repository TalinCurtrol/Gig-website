package usydhelper.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import usydhelper.controller.UserController;
import usydhelper.dao.UserRepository;
import usydhelper.entity.dto.User;
import usydhelper.entity.vo.UserVO;
import usydhelper.utils.result.R;

import java.util.Optional;

@SpringBootTest
public class UserTest {

    @Autowired
    UserController userController;
    @Autowired
    UserRepository repository;

    @Test
    public void testLoginPositive() {
        UserVO vo = new UserVO();
        vo.setEmail("LouieMohlke1@gmail.com");
        vo.setPassword("123");
        R r = userController.loginPost(vo);
        Assert.isTrue(r.getSuccess(), "loginPost positive failed");
    }

    @Test
    public void testLoginNegative() {
        UserVO vo = new UserVO();
        vo.setEmail("LouieMohlke1@gmail.com");
        vo.setPassword("xxx");
        R r = userController.loginPost(vo);
        Assert.isTrue(!r.getSuccess(), "loginPost negative failed");
    }

    @Test
    public void testSignupPositive() {
        UserVO vo = new UserVO();
        vo.setFirstName("Joe");
        vo.setLastName("He");
        vo.setEmail("");
        vo.setPassword("123");
        vo.setBirthday("12/12/2001");
        R r = userController.signupPost(vo);
        Assert.isTrue(r.getSuccess(), "signupPost positive failed");
    }

    @Test
    public void testSignupNegative() {
        UserVO vo = new UserVO();
        vo.setFirstName("Joe");
        vo.setLastName("He");
        vo.setEmail("LouieMohlke1@gmail.com");
        vo.setPassword("123");
        vo.setBirthday("12/12/2001");
        R r = userController.signupPost(vo);
        Assert.isTrue(!r.getSuccess(), "signupPost negative failed");
    }

    @Test
    public void testGetUserPositive() {
        R r = userController.getUser(1);
        Assert.isTrue(r.getSuccess(), "testGetUserPositive failed");
    }

    @Test
    public void testGetUserNegative() {
        R r = userController.getUser(-1);
        Assert.isTrue(r.getSuccess(), "testGetUserNegative failed");
    }

    @Test
    public void testUpdateUser() {
        Optional<User> optionalUser = repository.findById(1);
        if (optionalUser.isPresent()) {
            UserVO vo = new UserVO();
            BeanUtils.copyProperties(optionalUser.get(), vo);
            vo.setFirstName("Louie");
            vo.setLastName("Mohlke");
            R r = userController.updateUserInfo(vo);
            Assert.isTrue(r.getSuccess(), "testUpdateUser failed");
        }
    }

    @Test
    public void testEdit() {
        R r = userController.editUser(1);
        Assert.isTrue(r.getSuccess(), "testEdit failed");
    }

    @Test
    public void testChangePassword() {
        R r = userController.changeUserpassword(1);
        Assert.isTrue(r.getSuccess(), "testUpdatePassword failed");
    }

    @Test
    public void testUpdatePassword() {
        UserVO vo = new UserVO();
        vo.setId(1);
        vo.setPassword("202cb962ac59075b964b07152d234b70");
        R r = userController.updatePasswordInfo(vo);
    }
}
