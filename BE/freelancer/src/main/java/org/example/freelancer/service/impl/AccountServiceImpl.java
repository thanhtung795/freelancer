package org.example.freelancer.service.Impl;

import com.itextpdf.layout.element.Paragraph;
import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.AccountDTO;
import org.example.freelancer.dto.AccountUserSkillDTO;
import org.example.freelancer.entity.*;
import org.example.freelancer.mapper.AccountMapper;
import org.example.freelancer.repository.AccountRepository;
import org.example.freelancer.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.util.List;


import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;


@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private final AccountMapper accountMapper; // Inject mapper từ Spring

    @Override
    public List<AccountDTO> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(account -> new AccountDTO(
                        account.getId(),
                        account.getEmail(),
                        account.getRole(),
                        account.getPassword(),
                        account.getStatus()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public AccountDTO createAccount(AccountDTO accountDTO) {
        if (accountRepository.existsByEmail(accountDTO.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        Account account = AccountMapper.INSTANCE.accountDTOToAccount(accountDTO);
        account.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
        Account savedAccount = accountRepository.save(account);

        return AccountMapper.INSTANCE.accountToAccountDTO(savedAccount);
    }

    @Override
    public Optional<AccountDTO> getAccountById(Integer id) {
        return accountRepository.findById(id)
                .map(AccountMapper.INSTANCE::accountToAccountDTO);
    }

    @Override
    public AccountDTO updateAccount(Integer id, AccountDTO accountDTO) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found."));

        account.setEmail(accountDTO.getEmail());
        account.setPassword(passwordEncoder.encode(accountDTO.getPassword()));
        account.setRole(accountDTO.getRole());
        account.setStatus(accountDTO.getStatus());

        Account updatedAccount = accountRepository.save(account);
        return AccountMapper.INSTANCE.accountToAccountDTO(updatedAccount);
    }

    @Override
    public void deleteAccount(Integer id) {
        if (!accountRepository.existsById(id)) {
            throw new RuntimeException("Account not found.");
        }
        accountRepository.deleteById(id);
    }


    @Override
    public Boolean changeAccountStatus(Boolean status, Integer id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found."));
        account.setStatus(status);
        accountRepository.save(account);
        return true;
    }

    /*
     *  Phương thức findAccountUserAndSkills nay sẽ lấy dự liệu từ ĐB lên
     * sau đó sẽ lấy dự iệu đực truy vấn lên map với AccountUserSkillDTO
     *sau  sẽ trả về 1 list AccountUserSkillDTO
     * */
    //
    @Override
    public List<AccountUserSkillDTO> findAccountUserAndSkills() {
        List<Object[]> results = accountRepository.findAllFreelancersWithSkills();  // Lấy dữ liệu từ truy vấn
        List<AccountUserSkillDTO> dtoList = new ArrayList<>();
        Map<Integer, AccountUserSkillDTO> freelancerMap = new HashMap<>();  // Để theo dõi các freelancer và kỹ năng của họ

        // Lặp qua kết quả của truy vấn
        for (Object[] result : results) {
            User user = (User) result[0];  // Lấy User
            Account account = (Account) result[1];  // Lấy Account
            FreelancerSkill freelancerSkill = (FreelancerSkill) result[2];  // Lấy FreelancerSkill
            Skill skill = freelancerSkill.getSkill();  // Lấy Skill từ FreelancerSkill

            // Kiểm tra nếu freelancer đã được thêm vào danh sách
            int freelancerId = user.getFreelancer().getId();
            AccountUserSkillDTO accountUserSkillDTO = freelancerMap.get(freelancerId);

            if (accountUserSkillDTO == null) {
                // Nếu freelancer chưa có trong map, tạo một DTO mới
                accountUserSkillDTO = new AccountUserSkillDTO();
                accountUserSkillDTO.setAccountId(account.getId());
                accountUserSkillDTO.setEmail(account.getEmail());
                accountUserSkillDTO.setRole(account.getRole());
                accountUserSkillDTO.setStatus(account.getStatus());

                accountUserSkillDTO.setUserId(user.getId());
                accountUserSkillDTO.setFirstName(user.getFirstName());
                accountUserSkillDTO.setLastName(user.getLastName());
                accountUserSkillDTO.setPhoneNumber(user.getPhoneNumber());
                accountUserSkillDTO.setAddress(user.getAddress());
                accountUserSkillDTO.setCreatedAt(user.getCreatedAt());

                Freelancer freelancer = user.getFreelancer();
                accountUserSkillDTO.setFreelancerId(freelancer.getId());
                accountUserSkillDTO.setImage(freelancer.getImage());
                accountUserSkillDTO.setHourlyRate(freelancer.getHourlyRate());

                // Khởi tạo danh sách kỹ năng
                accountUserSkillDTO.setSkills(new ArrayList<>());

                // Thêm freelancer vào map
                freelancerMap.put(freelancerId, accountUserSkillDTO);
            }

            // Thêm tên kỹ năng vào danh sách kỹ năng của freelancer
            accountUserSkillDTO.getSkills().add(skill.getSkillName());
        }

        // Chuyển đổi map thành danh sách DTO
        dtoList.addAll(freelancerMap.values());

        return dtoList;  // Trả về danh sách DTO
    }


    @Override
    public AccountDTO login(String email, String password) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, account.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return AccountMapper.INSTANCE.accountToAccountDTO(account);
    }

    @Override
    public void exportAccountsToExcel(List<AccountUserSkillDTO> accountUserSkillDTOs, ByteArrayOutputStream outputStream) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Accounts");

            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Account ID");
            headerRow.createCell(1).setCellValue("Email");
            headerRow.createCell(2).setCellValue("Role");
            headerRow.createCell(3).setCellValue("Status");
            headerRow.createCell(4).setCellValue("User ID");
            headerRow.createCell(5).setCellValue("First Name");
            headerRow.createCell(6).setCellValue("Last Name");
            headerRow.createCell(7).setCellValue("Phone Number");
            headerRow.createCell(8).setCellValue("Address");
            headerRow.createCell(9).setCellValue("Created At");
            headerRow.createCell(10).setCellValue("Freelancer ID");
            headerRow.createCell(11).setCellValue("Image");
            headerRow.createCell(12).setCellValue("Hourly Rate");
            headerRow.createCell(13).setCellValue("Skills");

            int rowNum = 1;
            for (AccountUserSkillDTO dto : accountUserSkillDTOs) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(dto.getAccountId());
                row.createCell(1).setCellValue(dto.getEmail());
                row.createCell(2).setCellValue(dto.getRole());
                row.createCell(3).setCellValue(dto.getStatus());
                row.createCell(4).setCellValue(dto.getUserId());
                row.createCell(5).setCellValue(dto.getFirstName());
                row.createCell(6).setCellValue(dto.getLastName());
                row.createCell(7).setCellValue(dto.getPhoneNumber());
                row.createCell(8).setCellValue(dto.getAddress());
                row.createCell(9).setCellValue(dto.getCreatedAt().toString());
                row.createCell(10).setCellValue(dto.getFreelancerId());
                row.createCell(11).setCellValue(dto.getImage());

                BigDecimal hourlyRate = dto.getHourlyRate();
                if (hourlyRate != null) {
                    row.createCell(12).setCellValue(hourlyRate.doubleValue());
                } else {
                    row.createCell(12).setCellValue("");
                }

                String skills = String.join(", ", dto.getSkills());
                row.createCell(13).setCellValue(skills);
            }

            // Ghi workbook vào OutputStream
            workbook.write(outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void exportAccountsToPDF(List<AccountUserSkillDTO> accountUserSkillDTOs, ByteArrayOutputStream outputStream) {
        try {
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(writer);
            Document document = new Document(pdfDocument);

            Table table = new Table(14);
            table.addHeaderCell(new Cell().add(new Paragraph("Account ID")));
            table.addHeaderCell(new Cell().add(new Paragraph("Email")));
            table.addHeaderCell(new Cell().add(new Paragraph("Role")));
            table.addHeaderCell(new Cell().add(new Paragraph("Status")));
            table.addHeaderCell(new Cell().add(new Paragraph("User ID")));
            table.addHeaderCell(new Cell().add(new Paragraph("First Name")));
            table.addHeaderCell(new Cell().add(new Paragraph("Last Name")));
            table.addHeaderCell(new Cell().add(new Paragraph("Phone Number")));
            table.addHeaderCell(new Cell().add(new Paragraph("Address")));
            table.addHeaderCell(new Cell().add(new Paragraph("Created At")));
            table.addHeaderCell(new Cell().add(new Paragraph("Freelancer ID")));
            table.addHeaderCell(new Cell().add(new Paragraph("Image")));
            table.addHeaderCell(new Cell().add(new Paragraph("Hourly Rate")));
            table.addHeaderCell(new Cell().add(new Paragraph("Skills")));

            for (AccountUserSkillDTO dto : accountUserSkillDTOs) {
                table.addCell(new Cell().add(new Paragraph(dto.getAccountId().toString())));
                table.addCell(new Cell().add(new Paragraph(dto.getEmail())));
                table.addCell(new Cell().add(new Paragraph(dto.getRole())));
                table.addCell(new Cell().add(new Paragraph(dto.getStatus().equals("active") ? "Đang hoạt động" : "Bị khóa")));
                table.addCell(new Cell().add(new Paragraph(dto.getUserId().toString())));
                table.addCell(new Cell().add(new Paragraph(dto.getFirstName())));
                table.addCell(new Cell().add(new Paragraph(dto.getLastName())));
                table.addCell(new Cell().add(new Paragraph(dto.getPhoneNumber())));
                table.addCell(new Cell().add(new Paragraph(dto.getAddress())));
                table.addCell(new Cell().add(new Paragraph(dto.getCreatedAt().toString())));
                table.addCell(new Cell().add(new Paragraph(dto.getFreelancerId() != null ? dto.getFreelancerId().toString() : "")));
                table.addCell(new Cell().add(new Paragraph(dto.getImage() != null ? dto.getImage() : "")));
                table.addCell(new Cell().add(new Paragraph(dto.getHourlyRate() != null ? dto.getHourlyRate().toString() : "")));
                table.addCell(new Cell().add(new Paragraph(String.join(", ", dto.getSkills()))));
            }

            document.add(table);
            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}




