package usydhelper.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import usydhelper.entity.dto.BlockedUser;


@Repository
public interface BlockedUsersRepository extends JpaRepository<BlockedUser, Integer>, JpaSpecificationExecutor<BlockedUser> {
}
