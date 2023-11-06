package usydhelper.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import usydhelper.dao.BlockedUsersRepository;
import usydhelper.dao.UserRepository;
import usydhelper.entity.dto.BlockedUser;
import usydhelper.entity.dto.User;
import usydhelper.entity.vo.UserVO;
import usydhelper.service.UserService;
import usydhelper.utils.converter.StringDateConverter;
import usydhelper.utils.encrypt.MD5;
import usydhelper.utils.result.R;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BlockedUsersRepository blockedUsersRepository;

    @Override
    public R checkCredentials(UserVO userVO) {
        String email = userVO.getEmail();
        String encryptedPassword = MD5.encrypt(userVO.getPassword());

        User userInfo = new User();

        for (User user : userRepository.findAll()) {
            if (user.getEmail().equals(email)) {
                Integer id = user.getId();
                Optional<BlockedUser> blockedUser = blockedUsersRepository.findById(id);
                if (blockedUser.isPresent()) {
                    return R.error().data("authenticated", false).message("Sorry, you have been blocked.");
                }
                if (user.getPassword().equals(encryptedPassword)) {
                    return R.ok()
                            .data("name", user.getName())
                            .data("email", user.getEmail())
                            .data("id", user.getId())
                            .data("authenticated", true);
                }
            }
        }

        return R.error().data("authenticated", false).message("Sorry, the email or the password is incorrect.");
    }

    @Override
    public R signUp(String name, String email, String degree, String birthday, String mobileNumber, String password) {

        List<User> allUser = userRepository.findAll();
        if (!"".equals(email)) {
            for (User user : allUser) {
                // no identical email
                if (user.getEmail().equals(email)) {
                    return R.error().message("identical email");
                }
            }
        }

        String encryptedPassword = MD5.encrypt(password);
        //Create a User object and save the posted data
        User userInfo = new User();
        userInfo.setName(name);
        userInfo.setEmail(email);
        userInfo.setDegree(degree);
        userInfo.setBirthday(StringDateConverter.stringToDate(birthday));
        userInfo.setMobileNumber(mobileNumber);
        userInfo.setPassword(encryptedPassword);
        System.out.println(birthday);
        User newUserInfo = userRepository.save(userInfo);

        return R.ok()
                .data("authenticated", true)
                .data("name", newUserInfo.getName())
                .data("email", newUserInfo.getEmail())
                .data("degree", newUserInfo.getDegree())
                .data("birthday", newUserInfo.getBirthday())
                .data("mobileNumber", newUserInfo.getMobileNumber())
                .data("id", newUserInfo.getId());
    }

    @Override
    public List<UserVO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserVO> uservos = new ArrayList<>();
        for (User user : users) {
            UserVO uservo = this.getUserVOByUser(user);
            uservos.add(uservo);
        }
        return uservos;
    }

    @Override
    public void updateAUser(UserVO userVO) {
        User user = new User();
        user.setId(userVO.getId());
        User olduser = userRepository.findById(userVO.getId()).get();
        if (userVO.getFirstName() == "" && userVO.getLastName() == "") {
            user.setName(olduser.getName());
        } else if (userVO.getFirstName() == "" && !(userVO.getLastName() == "")) {
            user.setName(olduser.getName().split(" ")[0] + " " + userVO.getLastName());
        } else if (!(userVO.getFirstName() == "") && userVO.getLastName() == "") {
            user.setName(userVO.getFirstName() + " " + olduser.getName().split(" ")[1]);
        } else {
            user.setName(userVO.getFirstName() + " " + userVO.getLastName());
        }

        if (userVO.getDegree() == "") {
            user.setDegree(olduser.getDegree());
        } else {
            user.setDegree(userVO.getDegree());
        }

        if (userVO.getBirthday() == null) {
            user.setBirthday(olduser.getBirthday());
        } else {
            user.setBirthday(StringDateConverter.stringToDate(userVO.getBirthday()));
        }


        if (userVO.getMobileNumber() == "") {
            System.out.println("mb null");
            user.setMobileNumber(olduser.getMobileNumber());
        } else {
            user.setMobileNumber(userVO.getMobileNumber());
        }

        user.setEmail(olduser.getEmail());
        user.setPassword(olduser.getPassword());

        userRepository.save(user);
    }

    @Override
    public List<UserVO> searchUserNameIdNumberEmail(String s) {


        Specification<User> userSpecification = new Specification<>() {
            @Override
            public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>();

                Predicate p2 = cb.like(root.get("mobileNumber"), "%" + s + "%");

                Predicate p3 = cb.like(root.get("name"), "%" + s + "%");
                Predicate p4 = cb.like(root.get("email"), "%" + s + "%");
                Predicate p = cb.or(p2, p3);
                p = cb.or(p, p4);
                if (s.matches("[0-9]+")) {
                    Predicate p1 = cb.equal(root.get("id"), Integer.parseInt(s));
                    p = cb.or(p, p1);
                }


                predicates.add(p);
                return query.where(predicates.toArray(new Predicate[0])).getRestriction();
            }
        };

        List<User> userList = userRepository.findAll(userSpecification);
        ArrayList<UserVO> userVOS = new ArrayList<>();
        for (User user : userList) {
            userVOS.add(this.getUserVOByUser(user));
        }

        return userVOS;
    }

    @Override
    public UserVO getUserById(Integer userId) {

        Optional<User> u = userRepository.findById(userId);
        UserVO userVO = new UserVO();

        if (u.isPresent()) {
            User user = u.get();
            String username = user.getName();
            userVO.setFirstName(username.split(" ")[0]);
            userVO.setLastName(username.split(" ")[1]);
            userVO.setEmail(user.getEmail());
            userVO.setId(user.getId());
            userVO.setBirthday(StringDateConverter.dateToString(user.getBirthday()));
            userVO.setDegree(user.getDegree());
            userVO.setMobileNumber(user.getMobileNumber());
            userVO.setPassword(user.getPassword());
        }

        return userVO;
    }


    private UserVO getUserVOByUser(User user) {
        UserVO uservo = new UserVO();
        BeanUtils.copyProperties(user, uservo);
        uservo.setFirstName(user.getName().split(" ")[0]);
        uservo.setLastName(user.getName().split(" ")[1]);
        uservo.setBirthday(StringDateConverter.dateToString(user.getBirthday()));
        return uservo;
    }


    @Override
    public void changeThepassword(UserVO userVO) {
        User user = new User();
        user.setId(userVO.getId());
        User olduser = userRepository.findById(userVO.getId()).get();
        user.setName(olduser.getName());
        user.setDegree(olduser.getDegree());
        user.setBirthday(olduser.getBirthday());
        user.setMobileNumber(olduser.getMobileNumber());
        user.setEmail(olduser.getEmail());
        user.setPassword(userVO.getPassword());
        userRepository.save(user);
    }
}
