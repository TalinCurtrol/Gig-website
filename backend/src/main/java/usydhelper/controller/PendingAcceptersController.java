package usydhelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usydhelper.entity.vo.AcceptApplicantVO;
import usydhelper.entity.vo.ApplicantVO;
import usydhelper.service.PendingAcceptersService;
import usydhelper.utils.result.R;

import java.util.List;

@RestController
@CrossOrigin
public class PendingAcceptersController {

    @Autowired
    private PendingAcceptersService service;

    @GetMapping("/applicant/{postId}")
    public R getAllApplicants(@PathVariable Integer postId) {
        List<ApplicantVO> allApplicants = service.getAllApplicants(postId);
        return R.ok().data("applicants", allApplicants);
    }

    @PostMapping("/acceptApplicant")
    public R acceptApplicant(@RequestBody AcceptApplicantVO vo) {
        service.acceptApplicant(vo);
        return R.ok();
    }
}
