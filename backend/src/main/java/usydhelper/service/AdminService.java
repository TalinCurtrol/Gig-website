package usydhelper.service;

import usydhelper.entity.vo.AdminVO;
import usydhelper.entity.vo.BlockedUserVO;
import usydhelper.entity.vo.UserVO;
import usydhelper.utils.result.R;

import java.util.ArrayList;
import java.util.List;

public interface AdminService {
    R checkCredentials(AdminVO adminVO);
    ArrayList<BlockedUserVO> getAllBlocks();
    R banAUser(int id,String note);
    R suspendAUser(int id,String note);
    R releaseAUser(int id);

    boolean checkBlocked(int id);

}
