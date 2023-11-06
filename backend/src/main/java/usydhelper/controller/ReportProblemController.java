package usydhelper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import usydhelper.entity.dto.ReportProblem;
import usydhelper.service.ReportProblemService;
import usydhelper.utils.result.R;

@RestController
@CrossOrigin
public class ReportProblemController {

    @Autowired
    private ReportProblemService service;

    @PostMapping("/reportProblem")
    public R reportProblem(@RequestBody ReportProblem vo) {
        service.saveProblem(vo);
        return R.ok();
    }

    @GetMapping("/reportlist")
    public R showAllReport(){
        return R.ok().data("reports",service.getAllReport());
    }

    @GetMapping("/searchreport/string={s}")
    public R searchAReport(@PathVariable String s){
        return R.ok().data("reports",service.getReportByString(s));
    }
    @GetMapping("/reportdone/id={id}")
    public R setReportDone(@PathVariable int id) {
        service.setReportDone(id);
        return R.ok();
    }

    @PostMapping("/reportstate")
    public R setReportDone(@RequestBody ReportProblem vo) {
        service.setRportState(vo);
        return R.ok();
    }

}
