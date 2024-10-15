package org.example.freelancer.repository;

import org.example.freelancer.dto.FreelancerApplyDTO;
import org.example.freelancer.entity.Freelancer;
import org.example.freelancer.entity.StatusFreelancerJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FreelancerRepository extends JpaRepository<Freelancer, Integer> {

    @Query("SELECT COUNT(f) AS freelancer, COUNT(c) AS client " +
            "FROM User u " +
            "LEFT JOIN u.client c " +
            "LEFT JOIN u.freelancer f")
    List<Object[]> countFreelancersAndClients();


    @Query(
            "select new org.example.freelancer.dto.FreelancerApplyDTO(" +
                    "f.id, u.firstName, u.lastName, u.phoneNumber,a.email,  " +
                    "u.address,  f.image, f.hourlyRate, fj.status) " +
                    "from Freelancer f " +
                    "join f.user u " +
                    "join u.account a " +
                    "join f.freelancerJobs fj " +
                    "join fj.job j " +
                    "where j.id = ?1"
    )
    List<FreelancerApplyDTO> findAllByJobId(Integer jobId);



    @Query("SELECT DISTINCT f FROM Freelancer f " +
            "LEFT JOIN FETCH f.freelancerJobs fj " +
            "LEFT JOIN FETCH fj.job " +
            "WHERE f.id = :freelancerId")
    Optional<Freelancer> findByIdWithJobs(@Param("freelancerId") Integer freelancerId);
    @Query("SELECT DISTINCT f FROM Freelancer f " +
            "LEFT JOIN FETCH f.freelancerJobs fj " +
            "LEFT JOIN FETCH fj.job " +
            "WHERE f.id = :freelancerId and fj.status = :status")
    Optional<Freelancer> findJobsByFreelancerIdAndStatus(
            @Param("freelancerId") Integer freelancerId,
            @Param("status") StatusFreelancerJob status);

}
