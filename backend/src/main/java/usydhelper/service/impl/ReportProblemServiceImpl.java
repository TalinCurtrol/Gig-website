package usydhelper.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import usydhelper.dao.ReportProblemRepository;
import usydhelper.entity.dto.ReportProblem;
import usydhelper.service.ReportProblemService;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReportProblemServiceImpl implements ReportProblemService {

    @Autowired
    private ReportProblemRepository repository;

    @Override
    public void saveProblem(ReportProblem reportProblem) {
        reportProblem.setState("new");
        repository.save(reportProblem);
    }

    @Override
    public List<ReportProblem> getAllReport() {
        List<ReportProblem> reportProblems = new ArrayList<>();
        reportProblems = repository.findAll();
        return reportProblems;
    }

    @Override
    public List<ReportProblem> getReportByString(String s) {
        if (!s.equals(null)) {
            Specification<ReportProblem> reportProblemSpecification = new Specification<ReportProblem>() {
                @Override
                public Predicate toPredicate(Root<ReportProblem> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                    List<Predicate> predicates = new ArrayList<>();

                    Predicate p = cb.like(root.get("description"), "%" + s + "%");

                    if (s.matches("[0-9]+")) {
                        Predicate p3 = cb.equal(root.get("id"), Integer.parseInt(s));
                        Predicate p4 = cb.equal(root.get("userId"), Integer.parseInt(s));

                        p = cb.or(p, p3);
                        p = cb.or(p, p4);

                    }
                    predicates.add(p);
                    return query.where(predicates.toArray(new Predicate[0])).getRestriction();
                }
            };
            List<ReportProblem> reportProblems = repository.findAll(reportProblemSpecification);

            return reportProblems;
        } else {
            return new ArrayList<>();
        }


    }

    @Override
    public void setReportDone(int id) {
        Optional<ReportProblem> reportProblemOptional = repository.findById(id);
        if (reportProblemOptional.isPresent()) {
            ReportProblem oldreport = reportProblemOptional.get();
            ReportProblem reportProblem = new ReportProblem();
            reportProblem.setId(oldreport.getId());
            reportProblem.setUserId(oldreport.getUserId());
            reportProblem.setPostId(oldreport.getPostId());
            reportProblem.setDescription(oldreport.getDescription());
            reportProblem.setState("Done");
            repository.save(reportProblem);
        }
    }

    @Override
    public void setRportState(ReportProblem reportProblem) {
        Optional<ReportProblem> reportProblemOptional = repository.findById(reportProblem.getId());
        if (reportProblemOptional.isPresent()) {
            ReportProblem oldreport = reportProblemOptional.get();
            ReportProblem newreport = new ReportProblem();
            newreport.setId(oldreport.getId());
            newreport.setUserId(oldreport.getUserId());
            newreport.setPostId(oldreport.getPostId());
            newreport.setDescription(oldreport.getDescription());
            newreport.setState(reportProblem.getState());
            repository.save(newreport);
        }

    }
}
