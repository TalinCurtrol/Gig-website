package usydhelper.entity.vo;


import lombok.Data;

@Data
public class UserVO {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String birthday;
    private String degree;
    private String mobileNumber;
}
