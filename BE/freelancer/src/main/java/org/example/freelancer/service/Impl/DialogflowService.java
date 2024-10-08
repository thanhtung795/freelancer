package org.example.freelancer.service.Impl;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.dialogflow.v2.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class DialogflowService {

    private SessionsClient sessionsClient;
    private String projectId = "talent-hubs-fqhx";

    public DialogflowService() throws IOException {
        // Đọc file JSON từ resources
        try (InputStream inputStream = new ClassPathResource("talent-hubs-fqhx-75973daee912.json").getInputStream()) {
            GoogleCredentials credentials = GoogleCredentials.fromStream(inputStream);
            SessionsSettings sessionsSettings = SessionsSettings.newBuilder()
                    .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                    .build();
            this.sessionsClient = SessionsClient.create(sessionsSettings);
        }
    }

    public String detectIntentTexts(String sessionId, String text, String languageCode) throws Exception {
        SessionName session = SessionName.of(projectId, sessionId);
        TextInput.Builder textInput = TextInput.newBuilder().setText(text).setLanguageCode(languageCode);
        QueryInput queryInput = QueryInput.newBuilder().setText(textInput).build();

        DetectIntentRequest request = DetectIntentRequest.newBuilder()
                .setSession(session.toString())
                .setQueryInput(queryInput)
                .build();

        DetectIntentResponse response = sessionsClient.detectIntent(request);
        return response.getQueryResult().getFulfillmentText();
    }
}
