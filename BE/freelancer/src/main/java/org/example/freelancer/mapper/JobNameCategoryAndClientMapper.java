package org.example.freelancer.mapper;

import org.example.freelancer.dto.JobNameCategoryAndClientDTO;
import org.example.freelancer.entity.Job;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface JobNameCategoryAndClientMapper {

    // Ánh xạ từ Job sang JobNameCategoryAndClientDTO
    @Mapping(target = "clientName", source = "client.user.firstName")
    @Mapping(target = "categoryName", source = "category.categoryTitle")
    @Mapping(target = "dateStart", source = "dateStart", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "dateEnd", source = "dateEnd", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "dateCreate", source = "createdAt", dateFormat = "yyyy-MM-dd")
    JobNameCategoryAndClientDTO toDto(Job job);

    // Ánh xạ từ JobNameCategoryAndClientDTO sang Job
    @Mapping(target = "client.user.firstName", source = "clientName")
    @Mapping(target = "category.categoryTitle", source = "categoryName")
    @Mapping(target = "dateStart", source = "dateStart")
    @Mapping(target = "dateEnd", source = "dateEnd")
    @Mapping(target = "createdAt", source = "dateCreate")
    Job toEntity(JobNameCategoryAndClientDTO jobDTO);

}
