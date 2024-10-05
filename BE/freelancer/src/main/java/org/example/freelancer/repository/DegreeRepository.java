package org.example.freelancer.repository;

import org.example.freelancer.entity.Degree;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DegreeRepository extends JpaRepository<Degree, Integer> {
}
