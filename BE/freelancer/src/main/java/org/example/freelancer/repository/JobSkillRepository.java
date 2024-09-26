package org.example.freelancer.repository;

import org.example.freelancer.entity.JobSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSkillRepository extends JpaRepository<JobSkill, Integer> {
}
