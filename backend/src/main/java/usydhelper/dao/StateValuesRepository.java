package usydhelper.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import usydhelper.entity.dto.StateValues;

@Repository
public interface StateValuesRepository extends JpaRepository<StateValues, Integer> {
}
