package org.example.freelancer.mapper;

import org.example.freelancer.dto.FreelancerApplyDTO;
import org.example.freelancer.entity.Freelancer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FreelancerApplyMapper {
    FreelancerApplyMapper INSTANCE = Mappers.getMapper(FreelancerApplyMapper.class);

    @Mapping(source = "id", target = "freelancerId")
    @Mapping(source = "user.firstName", target = "firstName")
    @Mapping(source = "user.lastName", target = "lastName")
    @Mapping(source = "user.phoneNumber", target = "phoneNumber")
    @Mapping(source = "user.address", target = "address")
    @Mapping(source = "user.account.email", target = "email")
    @Mapping(source = "image", target = "image")
    @Mapping(source = "hourlyRate", target = "hourlyRate")
    FreelancerApplyDTO toDTO(Freelancer entity);

    @Mapping(source = "freelancerId", target = "id")
    @Mapping(source = "firstName", target = "user.firstName")
    @Mapping(source = "lastName", target = "user.lastName")
    @Mapping(source = "phoneNumber", target = "user.phoneNumber")
    @Mapping(source = "address", target = "user.address")
    @Mapping(source = "email", target = "user.account.email")
    @Mapping(source = "image", target = "image")
    @Mapping(source = "hourlyRate", target = "hourlyRate")
    Freelancer toEntity(FreelancerApplyDTO dto);


}
