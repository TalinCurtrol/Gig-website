package usydhelper.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usydhelper.entity.vo.UserVO;
import usydhelper.service.UserService;
import usydhelper.utils.result.R;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public R loginPost(@RequestBody UserVO userVO) {
        return userService.checkCredentials(userVO);
    }

    @PostMapping("/signup")
    public R signupPost(@RequestBody UserVO userVO) {
        String user = userVO.getFirstName() + " " + userVO.getLastName();
        String email = userVO.getEmail();
        String degree = userVO.getDegree();
        String birthday = userVO.getBirthday();
        String mobileNumber = userVO.getMobileNumber();
        String password = userVO.getPassword();
        return userService.signUp(user, email, degree, birthday, mobileNumber, password);
    }


    @GetMapping("/user/{userId}")
    public R getUser(@PathVariable Integer userId) {
        UserVO userVO = userService.getUserById(userId);
        return R.ok().data("user", userVO);
    }

    @PostMapping("/updateUser")// whatever you modified, all information needed, including what was not changed
    public R updateUserInfo(@RequestBody UserVO userVO) {
        userService.updateAUser(userVO);
        return R.ok();
    }

    @GetMapping("/edit/{userId}")
    public R editUser(@PathVariable Integer userId) {
        UserVO userVO = userService.getUserById(userId);
        return R.ok().data("user", userVO);
    }

    @PostMapping("/updatePassword")
    public R updatePasswordInfo(@RequestBody UserVO userVO) {
        userService.changeThepassword(userVO);
        return R.ok().message("Change Success!");

    }

    @GetMapping("/changepassword/{userId}")
    public R changeUserpassword(@PathVariable Integer userId) {
        UserVO userVO = userService.getUserById(userId);
        return R.ok().data("user", userVO);
    }
}
