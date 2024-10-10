package org.example.freelancer.repository;
import org.example.freelancer.dto.InfoFreelancerDTO;
import org.example.freelancer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT f.freelancer_id, " +
            "f.image, " +
            "u.first_name, " +
            "u.last_name, " +
            "u.address, " +
            "f.category_id, " +
            "c.category_title AS category_title, " +
            "s.skill_id AS skill_id, " +
            "s.skill_name AS skill_name, " +
            "sch.school_name AS school_name, " +
            "edu.date_start, " +
            "edu.date_end, " +
            "m.major_name AS major_name, " +
            "d.degree_title AS degree_title " +
            "FROM freelancer f " +
            "LEFT JOIN user u ON f.user_id = u.user_id " +
            "LEFT JOIN freelancer_skill fs ON f.freelancer_id = fs.freelancer_id " +
            "LEFT JOIN skill s ON fs.skill_id = s.skill_id " +
            "LEFT JOIN education edu ON f.freelancer_id = edu.freelancer_id " +
            "LEFT JOIN school sch ON edu.school_id = sch.school_id " +
            "LEFT JOIN major m ON edu.major_id = m.major_id " +
            "LEFT JOIN degree d ON edu.degree_id = d.degree_id " +
            "LEFT JOIN category c ON f.category_id = c.category_id",
            nativeQuery = true)
    List<Object[]> findAllFreelancers();



    @Query
            (
            "select edu.id.schoolId , " +
                    " edu.school.schoolName, " +
                    " edu.dateStart," +
                    " edu.dateEnd," +
                    " edu.description," +
                    " edu.major.majorName," +
                    " edu.degree.degreeTitle" +
                    " from Education edu " +
                    " where edu.freelancer.id = :freelancerId "
    )

    List<Object[]> getEducationDetailsForFreelancer(@Param("freelancerId")Integer freelancerId);
}
