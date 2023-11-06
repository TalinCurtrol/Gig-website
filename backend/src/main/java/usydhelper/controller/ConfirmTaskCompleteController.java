package usydhelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import usydhelper.entity.vo.ConfirmVo;
import usydhelper.service.ConfirmTaskCompleteService;
import usydhelper.utils.result.R;

@RestController
@CrossOrigin
public class ConfirmTaskCompleteController {

    @Autowired
    private ConfirmTaskCompleteService service;

    @PostMapping("/task/complete")
    public R accepterCompleteTask(@RequestBody ConfirmVo confirmVo) {
        service.savePendingConfirm(confirmVo);
        return R.ok();
    }

    @PostMapping("/task/confirmComplete")
    public R confirmComplete(@RequestBody ConfirmVo confirmVo) {
        service.confirmComplete(confirmVo);
        return R.ok();
    }

}
