package usydhelper.service;

import usydhelper.entity.dto.ReportProblem;
import java.util.List;
public interface ReportProblemService {
    void saveProblem(ReportProblem vo);

    List<ReportProblem> getAllReport();

    List<ReportProblem> getReportByString(String s);

    void setReportDone(int id);

    void setRportState(ReportProblem reportProblem);
}
