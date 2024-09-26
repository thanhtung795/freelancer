package org.example.freelancer.service.Impl;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.SkillDTO;
import org.example.freelancer.entity.Skill;
import org.example.freelancer.mapper.SkillMapper;
import org.example.freelancer.repository.SkillRepository;
import org.example.freelancer.service.SkillService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {
    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    @Override
    public List<SkillDTO> getAllSkill() {
        return skillRepository.findAll().stream().map(skillMapper::toDto).toList();
    }

    @Override
    public SkillDTO addSkillDto(SkillDTO skillDTO) {
        Skill skill = skillMapper.toEntity(skillDTO);
        return SkillMapper.INSTANCE.toDto(skillRepository.save(skill));
    }
}
