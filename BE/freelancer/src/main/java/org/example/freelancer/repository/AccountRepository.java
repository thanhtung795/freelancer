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

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query("update Account a set a.status = ?1 where a.id = ?2")
    Boolean changeAccountStatus(Boolean status, Integer id);

    //
//    @Query(value = "SELECT " +
//            "a.account_id, " +
//            "a.email, " +
//            "a.role, " +
//            "a.status, " +
//            "u.first_name, " +
//            "u.last_name, " +
//            "u.phone_number, " +
//            "u.address, " +
//            "f.freelancer_id, " +
//            "f.image, " +
//            "f.hourly_rate, " +
//            "s.skill_id, " +
//            "s.skill_name " +
//            "FROM account a " +
//            "JOIN user u ON u.account_id = a.account_id " +
//            "JOIN freelancer f ON f.user_id = u.user_id " +
//            "JOIN freelancer_skill fs ON fs.freelancer_id = f.freelancer_id " +
//            "JOIN skill s ON s.skill_id = fs.skill_id", nativeQuery = true)
//    List<Object[]> findAccountUserAndSkills()
//    ;
    @Query("SELECT u, a, f.freelancerSkills  " +
            "FROM Freelancer f " +
            "JOIN f.user u " +
            "JOIN u.account a " +
            "JOIN f.freelancerSkills fk " +
            "JOIN fk.skill s ")
    List<Object[]> findAllFreelancersWithSkills();



//
//    @Query("SELECT a, u, fs FROM Account a " +
//            "JOIN a.user u " +
//            "JOIN Freelancer f ON f.user.id = u.id " +
//            "JOIN FreelancerSkill fs ON fs.freelancer.id = f.id")
//    List<AccountDTO> findAccountUserAndSkills();


//    @Transactional
//    @Modifying
//    @Query("SELECT a, u, s.skillName " +
//            "FROM Account a " +
//            "JOIN a.user u " +  // Tham chiếu đúng đến mối quan hệ User trong Account
//            "JOIN u.freelancer f " +  // Tham chiếu đúng đến mối quan hệ Freelancer trong User
//            "JOIN f.freelancerSkills fk " +  // Tham chiếu đến danh sách FreelancerSkills trong Freelancer
//            "JOIN fk.skill s")
//    void logDataQuery();


}
