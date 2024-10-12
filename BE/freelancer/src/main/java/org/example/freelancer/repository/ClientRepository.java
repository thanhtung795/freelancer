package org.example.freelancer.repository;

import org.example.freelancer.dto.ClientCompanyDTO;
import org.example.freelancer.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    @Override
    boolean existsById(Integer aLong);

    @Query("SELECT c.id, u.account.email, u.firstName, u.lastName, u.phoneNumber, "
            + "co.id, co.companyName, co.phoneContact, co.address "
            + "FROM Client c "
            + "JOIN c.user u "
            + "JOIN u.account a "
            + "LEFT JOIN c.company co")
    List<Object[]> findClientWithCompanyDetails();



}
