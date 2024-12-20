package org.example.freelancer.controller;

import org.example.freelancer.dto.ClientCompanyDTO;
import org.example.freelancer.dto.ClientDTO;
import org.example.freelancer.dto.ResponseObject;
import org.example.freelancer.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;  // Import @Valid

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
@Validated
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        List<ClientDTO> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable Integer id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ClientDTO> createClient(@Valid @RequestBody ClientDTO clientDTO) {
        ClientDTO createdClient = clientService.createClient(clientDTO);
        return ResponseEntity.ok(createdClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> updateClient(@PathVariable Integer id, @Valid @RequestBody ClientDTO clientDTO) {
        try {
            ClientDTO updatedClient = clientService.updateClient(id, clientDTO);
            return ResponseEntity.ok(updatedClient);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable Integer id) {
        try {
            clientService.deleteClient(id);
            return ResponseEntity.ok("Client deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/with-company")
    public ResponseEntity<ResponseObject<List<ClientCompanyDTO>>> getClientWithCompanyDetails() {
        List<ClientCompanyDTO> clients = clientService.getClientWithCompanyDetails();
        if (clients.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body((ResponseObject.<List<ClientCompanyDTO>>builder()
                    .message("No client found")
                    .status(404)
                    .build()));
        }

        return ResponseEntity.ok(ResponseObject.<List<ClientCompanyDTO>>builder()
                .data(clients)
                .message("Get all clients successfully")
                .status(200)
                .build());
    }

    @GetMapping("/{id}/with-company")
    public ResponseEntity<ResponseObject<ClientCompanyDTO>> getClientWithCompanyDetailsById(@PathVariable Integer id) {
        Optional<ClientCompanyDTO> clientCompanyDTO = clientService.getClientWithCompanyDetailsById(id);

        if (clientCompanyDTO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.<ClientCompanyDTO>builder()
                    .result(false)
                    .message("Client not found")
                    .status(404)
                    .build());
        }

        return ResponseEntity.ok(ResponseObject.<ClientCompanyDTO>builder()
                .data(clientCompanyDTO.get())
                .message("Get client successfully")
                .status(200)
                .build());
    }

}
