package usydhelper.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import usydhelper.dao.AdminRepository;
import usydhelper.dao.BlockedUsersRepository;
import usydhelper.dao.UserRepository;
import usydhelper.entity.dto.Admin;
import usydhelper.entity.dto.BlockedUser;
import usydhelper.entity.dto.User;
import usydhelper.entity.vo.AdminVO;
import usydhelper.entity.vo.BlockedUserVO;
import usydhelper.entity.vo.UserVO;
import usydhelper.service.AdminService;
import usydhelper.utils.result.R;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BlockedUsersRepository blockedUsersRepository;

    @Override
    public R checkCredentials(AdminVO adminVO) {

        String adminName = adminVO.getAdminName();
        String password =adminVO.getPassword();

        for(Admin admin : adminRepository.findAll()) {
            if(admin.getAdminName().equals(adminName)) {

                if(admin.getPassword().equals(password)){
                    return R.ok()
                            .data("id",admin.getId())
                            .data("adminName",admin.getAdminName())
                            .data("correct",true);
                }
            }
        }
        return R.ok().data("correct",false);
    }

    @Override
    public ArrayList<BlockedUserVO> getAllBlocks() {
        List<BlockedUser> bus =blockedUsersRepository.findAll();
        ArrayList<BlockedUserVO> blockedUserVOS = new ArrayList<>();
        for(BlockedUser bu:bus){
            blockedUserVOS.add(getBlockedUserVOByBlockedUser(bu));
        }
        return blockedUserVOS;
    }

    @Override
    public R banAUser(int userid, String note) {
        Optional<BlockedUser> u = blockedUsersRepository.findById(userid);
        if(!u.isPresent()){
            BlockedUser b =new BlockedUser();
            b.setUserid(userid);
            b.setBlockState("Ban "+note);
            blockedUsersRepository.save(b);
        }
        return R.ok();
    }

    @Override
    public R suspendAUser(int userid, String note) {

        Optional<BlockedUser> u = blockedUsersRepository.findById(userid);
        if(!u.isPresent()){
            BlockedUser b =new BlockedUser();
            b.setUserid(userid);

            b.setBlockState("Suspend "+note);
            blockedUsersRepository.save(b);
        }
        return R.ok();
    }

    @Override
    public R releaseAUser(int userid) {
        Optional<BlockedUser> u = blockedUsersRepository.findById(userid);
        if(u.isPresent()){
            blockedUsersRepository.deleteById(userid);
        }
        return R.ok();
    }

    @Override
    public boolean checkBlocked(int id) {
        if(!String.valueOf(id).equals("")){
            Optional<BlockedUser> u = blockedUsersRepository.findById(id);
            return u.isPresent();

        }else{
            return false;
        }

    }

    private BlockedUserVO getBlockedUserVOByBlockedUser(BlockedUser blockedUser){
        BlockedUserVO blockedUserVO= new BlockedUserVO();
        BeanUtils.copyProperties(blockedUser, blockedUserVO);
        return blockedUserVO;
    }

}
