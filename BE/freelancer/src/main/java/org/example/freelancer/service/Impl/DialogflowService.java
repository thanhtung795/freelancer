package org.example.freelancer.service.Impl;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.dialogflow.v2.*;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class DialogflowService {
    private SessionsClient sessionsClient;

    @PostConstruct
    public void init() {
        try {
            InputStream credentialsStream = new FileInputStream("freelancer/src/main/resources/talent-hub-xoxy-ce627abeef53.json");
            GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream);
            sessionsClient = SessionsClient.create(SessionsSettings.newBuilder().setCredentialsProvider(FixedCredentialsProvider.create(credentials)).build());
        } catch (IOException e) {
            throw new RuntimeException("Failed to create Dialogflow SessionsClient", e);
        }
    }

    public QueryResult detectIntent(String projectId, String sessionId, String query) {
        SessionName session = SessionName.of(projectId, sessionId);
        TextInput.Builder textInput = TextInput.newBuilder().setText(query).setLanguageCode("en-US");
        QueryInput queryInput = QueryInput.newBuilder().setText(textInput).build();

        try {
            DetectIntentResponse response = sessionsClient.detectIntent(session, queryInput);
            return response.getQueryResult();
        } catch (Exception e) {
            throw new RuntimeException("Dialogflow request failed", e);
        }
    }

    // Đảm bảo đóng SessionsClient khi ứng dụng kết thúc
    @PreDestroy
    public void shutdown() {
        if (sessionsClient != null) {
            sessionsClient.close();
        }
    }
}
