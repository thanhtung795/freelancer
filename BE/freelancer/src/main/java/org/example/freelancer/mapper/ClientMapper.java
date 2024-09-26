package org.example.freelancer.mapper;

import org.example.freelancer.dto.ClientDTO;
import org.example.freelancer.entity.Client;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ClientMapper {
    ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);

    Client clientDTOToClient(ClientDTO clientDTO);
    ClientDTO clientToClientDTO(Client client);
}
