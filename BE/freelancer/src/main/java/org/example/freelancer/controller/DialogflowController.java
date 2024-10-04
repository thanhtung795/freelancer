package org.example.freelancer.controller;

import com.google.cloud.dialogflow.v2.QueryResult;
import org.example.freelancer.dto.QueryResultDTO;
import org.example.freelancer.service.Impl.DialogflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping ("/api/dialogflow")
public class DialogflowController {
    @Autowired
    private DialogflowService dialogflowService;

    @PostMapping("/query")
    public QueryResultDTO queryDialogflow(@RequestBody Map<String, String> request) {
        String projectId = "talent-hub-xoxy";
        String sessionId = UUID.randomUUID().toString(); // Sử dụng UUID làm session ID
        String query = request.get("query");

        QueryResult result = dialogflowService.detectIntent(projectId, sessionId, query);

        return new QueryResultDTO(
                result.getQueryText(),
                result.getIntent().getDisplayName(),
                result.getFulfillmentText()
        );
    }


}