package usydhelper.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import usydhelper.entity.dto.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
}
