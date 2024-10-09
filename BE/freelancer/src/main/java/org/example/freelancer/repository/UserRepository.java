package org.example.freelancer.repository;
import org.example.freelancer.dto.InfoFreelancerDTO;
import org.example.freelancer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query
            (
                    "SELECT f.id," +
                            " f.image," +
                            " u.firstName," +
                            " u.lastName, " +
                            " u.address, " +
                            " f.category.id," +
                            " f.category.categoryTitle," +
                            " fs.skill.id," +
                            " fs.skill.skillName," +
                            " edu.school.schoolName," +
                            " edu.dateStart," +
                            " edu.dateEnd," +
                            " edu.major.majorName," +
                            " edu.degree.degreeTitle " +
                            " from User u " +
                            " join u.freelancer f " +
                            " join f.educations edu " +
                            " join f.freelancerSkills fs"
            )
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
