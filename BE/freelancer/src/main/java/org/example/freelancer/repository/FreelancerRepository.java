package org.example.freelancer.repository;

import org.example.freelancer.dto.FreelancerApplyDTO;
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


    @Query(
            "select new org.example.freelancer.dto.FreelancerApplyDTO(" +
                    "f.id, u.firstName, u.lastName, u.phoneNumber, u.address, " +
                    "a.email, f.image, f.hourlyRate, fj.status) " +
                    "from Freelancer f " +
                    "join f.user u " +
                    "join u.account a " +
                    "join f.freelancerJobs fj " +
                    "join fj.job j " +
                    "where j.id = ?1"
    )
    List<FreelancerApplyDTO> findAllByJobId(Integer jobId);


}
