package org.example.freelancer.service.Impl;


import org.example.freelancer.dto.ClientCompanyDTO;
import org.example.freelancer.dto.ClientDTO;
import org.example.freelancer.dto.CompanyDTO;
import org.example.freelancer.mapper.ClientMapper;
import org.example.freelancer.entity.Client;
import org.example.freelancer.repository.ClientRepository;
import org.example.freelancer.repository.UserRepository;
import org.example.freelancer.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll()
                .stream()
                .map(ClientMapper.INSTANCE::clientToClientDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ClientDTO createClient(ClientDTO clientDTO) {
        Client client = ClientMapper.INSTANCE.clientDTOToClient(clientDTO);
        Client savedClient = clientRepository.save(client);
        return ClientMapper.INSTANCE.clientToClientDTO(savedClient);
    }

    @Override
    public Optional<ClientDTO> getClientById(Integer id) {
        return clientRepository.findById(id)
                .map(ClientMapper.INSTANCE::clientToClientDTO);
    }

    @Override
    public ClientDTO updateClient(Integer id, ClientDTO clientDTO) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found."));

        client.setFromPrice(clientDTO.getFromPrice());
        client.setToPrice(clientDTO.getToPrice());
        client.setTypePrice(clientDTO.getTypePrice());
        // Nếu có một User, có thể lấy từ ID và gán
        if(clientDTO.getUserId() != null){
            client.setUser(userRepository.findById(clientDTO.getUserId()).orElse(null));
        }


        Client updatedClient = clientRepository.save(client);
        return ClientMapper.INSTANCE.clientToClientDTO(updatedClient);
    }

    @Override
    public void deleteClient(Integer id) {
        if (!clientRepository.existsById(id)) {
            throw new RuntimeException("Client not found.");
        }
        clientRepository.deleteById(id);
    }

    @Override
    public List<ClientCompanyDTO> getClientWithCompanyDetails() {
        List<Object[]> results = clientRepository.findClientWithCompanyDetails();
        List<ClientCompanyDTO> dtos = new ArrayList<>();

        for (Object[] row : results) {
            Integer clientId = (Integer) row[0];
            String email = (String) row[1];
            String firstName = (String) row[2];
            String lastName = (String) row[3];
            String phoneNumber = (String) row[4];

            CompanyDTO company = new CompanyDTO(
                    (Integer) row[5],
                    (String) row[6],
                    (String) row[7],
                    (String) row[8]
            );

            ClientCompanyDTO dto = new ClientCompanyDTO(clientId, email, firstName, lastName, phoneNumber, company);
            dtos.add(dto);
        }

        return dtos;
    }
}
