package org.example.freelancer.mapper;

import org.example.freelancer.dto.AccountUserSkillDTO;
import org.example.freelancer.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AccountUserSkillMapper {

    AccountUserSkillMapper INSTANCE = Mappers.getMapper(AccountUserSkillMapper.class);

    @Mapping(target = "accountId", source = "account.id")
    AccountUserSkillDTO accountToAccountUserSkillDTO(Account account);

    Account accountUserSkillDTOToAccount(AccountUserSkillDTO accountUserSkillDTO);
}
