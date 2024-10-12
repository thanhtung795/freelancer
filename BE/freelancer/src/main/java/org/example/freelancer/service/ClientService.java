package org.example.freelancer.service;

import org.example.freelancer.dto.ClientCompanyDTO;
import org.example.freelancer.dto.ClientDTO;

import java.util.List;
import java.util.Optional;

public interface ClientService {
    List<ClientDTO> getAllClients();
    ClientDTO createClient(ClientDTO clientDTO);
    Optional<ClientDTO> getClientById(Integer id);
    ClientDTO updateClient(Integer id, ClientDTO clientDTO);
    void deleteClient(Integer id);
    List<ClientCompanyDTO> getClientWithCompanyDetails();
}
