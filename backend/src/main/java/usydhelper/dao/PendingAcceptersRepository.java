package usydhelper.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import usydhelper.entity.dto.PendingAccepters;

@Repository
public interface PendingAcceptersRepository extends JpaRepository<PendingAccepters, Integer>, JpaSpecificationExecutor<PendingAccepters> {
}
