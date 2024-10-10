package org.example.freelancer.repository;

import org.example.freelancer.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    // Tìm công ty dựa trên clientId
    @Query("SELECT c FROM Company c WHERE c.client.id = :clientId")
    Company findByClientId(@Param("clientId") Integer clientId);
}
