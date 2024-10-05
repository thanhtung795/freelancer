package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.dto.DegreeDTO;
import org.example.freelancer.dto.ResponseObject;
import org.example.freelancer.exception.NotFoundException;
import org.example.freelancer.service.DegreeService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/degrees")
public class DegreeController {
    private final DegreeService degreeService;

    @GetMapping
    public ResponseEntity<ResponseObject<List<DegreeDTO>>> getAllDegrees() {
        List<DegreeDTO> degrees = degreeService.getAllDegree();

        if (degrees.isEmpty()) {
            return ResponseEntity.ok(ResponseObject.<List<DegreeDTO>>builder()
                    .message("No degree found")
                    .status(404)
                    .build());
        }

        return ResponseEntity.ok(ResponseObject.<List<DegreeDTO>>builder()
                .data(degrees)
                .message("Get all degrees successfully")
                .status(200)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<DegreeDTO>> getDegreeById(@Validated @PathVariable Integer id) {
        Optional<DegreeDTO> degree = degreeService.getDegreeById(id);

        return degree
                .map(degreeDTO -> ResponseEntity.ok(ResponseObject.<DegreeDTO>builder()
                        .data(degreeDTO)
                        .message("Get degree successfully")
                        .status(200)
                        .build()))
                .orElseGet(() -> ResponseEntity.ok(ResponseObject.<DegreeDTO>builder()
                        .message("Degree not found")
                        .status(404)
                        .build()));
    }
}
