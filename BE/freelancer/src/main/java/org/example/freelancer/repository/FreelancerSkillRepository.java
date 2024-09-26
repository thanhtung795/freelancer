package org.example.freelancer.repository;

import org.example.freelancer.entity.FreelancerSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FreelancerSkillRepository extends JpaRepository<FreelancerSkill, Integer> {
}
