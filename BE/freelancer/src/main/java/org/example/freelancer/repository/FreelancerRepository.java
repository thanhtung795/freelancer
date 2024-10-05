package org.example.freelancer.repository;

import org.example.freelancer.entity.Freelancer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FreelancerRepository extends JpaRepository<Freelancer, Integer> {

    @Query("SELECT COUNT(f) AS freelancer, COUNT(c) AS client " +
            "FROM User u " +
            "LEFT JOIN u.client c " +
            "LEFT JOIN u.freelancer f")
    List<Object[]> countFreelancersAndClients();

}
