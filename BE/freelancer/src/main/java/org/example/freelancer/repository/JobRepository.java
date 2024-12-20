package org.example.freelancer.repository;

import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.entity.Job;
import org.example.freelancer.entity.StatusJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
    @Modifying
    @Query("UPDATE Job j SET j.status = :status WHERE j.id = :id")
    void changeStatus(@Param("id") Integer id, @Param("status") StatusJob status);

}
