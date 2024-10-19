package org.example.freelancer.mapper;

import org.example.freelancer.dto.JobDTO;
import org.example.freelancer.entity.Job;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface JobMapper {

    JobMapper INSTANCE = Mappers.getMapper(JobMapper.class);
//
//    @Mapping(source = "id", target = "id")
//    @Mapping(source = "dateStart", target = "dateStart")
//    @Mapping(source = "dateEnd", target = "dateEnd")
    @Mapping(source = "createdAt", target = "createdAt")
    JobDTO toDto(Job job);
//
//    @Mapping(source = "id", target = "id")
//    @Mapping(source = "dateStart", target = "dateStart")
//    @Mapping(source = "dateEnd", target = "dateEnd")
    @Mapping(source = "createdAt", target = "createdAt")
    Job toEntity(JobDTO dto);

}
