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
    @Mapping(target = "dateStart", source = "dateStart", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "dateEnd", source = "dateEnd", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "dateCreate", source = "createdAt", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "description", source = "description")


    JobDTO toDto(Job job);

    @Mapping(target = "client.id", source = "clientId") // Gán clientId vào client
    @Mapping(target = "category.id", source = "categoryId") // Gán categoryId vào category
    @Mapping(target = "dateStart", source = "dateStart", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "dateEnd", source = "dateEnd", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "createdAt", source = "dateCreate", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "description", source = "description")
    Job toEntity(JobDTO dto);

}
