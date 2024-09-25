package org.example.freelancer.mapper;

import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AccountMapper {
    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);

    AccountDTO accountToAccountDTO(Account account);
    Account accountDTOToAccount(AccountDTO accountDTO);
}
