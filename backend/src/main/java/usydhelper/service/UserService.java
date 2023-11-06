package usydhelper.service;

import usydhelper.entity.dto.User;
import usydhelper.entity.vo.UserVO;
import usydhelper.utils.result.R;

import java.util.Date;
import java.util.List;

public interface UserService {
   R checkCredentials(UserVO userVO);
   R signUp(String name, String email, String degree, String birthday, String mobileNumber, String password);
   UserVO getUserById(Integer userId);
   List<UserVO> getAllUsers();
   void updateAUser(UserVO userVO);
   void changeThepassword(UserVO userVO);
   List<UserVO> searchUserNameIdNumberEmail(String s);
}
