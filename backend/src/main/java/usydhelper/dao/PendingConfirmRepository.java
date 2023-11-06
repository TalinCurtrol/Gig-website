package usydhelper.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import usydhelper.entity.dto.PendingConfirm;

@Repository
public interface PendingConfirmRepository extends JpaRepository<PendingConfirm, Integer>, JpaSpecificationExecutor<PendingConfirm> {
}
