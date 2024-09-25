package org.example.freelancer.repository;

import org.example.freelancer.entity.Freelancer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreelancerRepository extends JpaRepository<Freelancer, Integer> {
}
