package org.example.freelancer.repository;

import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.dto.AccountUserSkillDTO;
import org.example.freelancer.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query("update Account a set a.status = ?1 where a.id = ?2")
    Boolean changeAccountStatus(Boolean status, Integer id);

    //
    @Query("SELECT u, a, f.freelancerSkills  " +
            "FROM Freelancer f " +
            "JOIN f.user u " +
            "JOIN u.account a " +
            "JOIN f.freelancerSkills fk " +
            "JOIN fk.skill s ")
    List<Object[]> findAllFreelancersWithSkills();



    Optional<Account> findByEmail(String email);

}
