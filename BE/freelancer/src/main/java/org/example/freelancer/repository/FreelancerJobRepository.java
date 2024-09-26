package org.example.freelancer.repository;

import org.example.freelancer.entity.FreelancerJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreelancerJobRepository extends JpaRepository<FreelancerJob, Integer> {
}
