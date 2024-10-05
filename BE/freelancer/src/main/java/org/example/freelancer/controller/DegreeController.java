package org.example.freelancer.controller;

import lombok.RequiredArgsConstructor;
import org.example.freelancer.service.DegreeService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/degrees")
public class DegreeController {
    private final DegreeService degreeService;

//    @GetMapping
//    public ResponseEntity<ResponeseOb>
}
