package org.example.freelancer.repository;

import org.example.freelancer.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    @Override
    boolean existsById(Integer aLong);


}
