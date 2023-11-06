package usydhelper.service;

import usydhelper.entity.vo.AcceptApplicantVO;
import usydhelper.entity.vo.ApplicantVO;

import java.util.List;

public interface PendingAcceptersService {
    public List<ApplicantVO> getAllApplicants(Integer postId);
    public void acceptApplicant(AcceptApplicantVO vo);
}
