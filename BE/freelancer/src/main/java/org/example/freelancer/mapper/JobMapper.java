package org.example.freelancer.mapper;

import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.entity.Job;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface JobMapper {

    JobMapper INSTANCE = Mappers.getMapper(JobMapper.class);


    @Mapping(target = "clientId", source = "client.id")
    @Mapping(target = "categoryId", source = "category.id")
    JobDTO toDto(Job job);

    @Mapping(target = "client.id", source = "clientId")
    @Mapping(target = "category.id", source = "categoryId")
    Job toEntity(JobDTO dto);

}
