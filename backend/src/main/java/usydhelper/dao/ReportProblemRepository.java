package usydhelper.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import usydhelper.entity.dto.Comment;
import usydhelper.entity.dto.ReportProblem;

@Repository
public interface ReportProblemRepository extends JpaRepository<ReportProblem, Integer>, JpaSpecificationExecutor<ReportProblem> {
}
