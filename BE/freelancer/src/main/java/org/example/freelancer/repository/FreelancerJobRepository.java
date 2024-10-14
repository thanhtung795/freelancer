package org.example.freelancer.repository;

import org.example.freelancer.entity.FreelancerJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FreelancerJobRepository extends JpaRepository<FreelancerJob, Integer> {
    Optional<FreelancerJob> findById_FreelancerIdAndId_JobId(Integer freelancerId, Integer jobId);
}
