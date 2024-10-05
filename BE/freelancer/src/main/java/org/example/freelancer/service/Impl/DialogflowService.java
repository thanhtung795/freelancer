package org.example.freelancer.service.Impl;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.dialogflow.v2.*;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Service
public class DialogflowService {

    private SessionsClient sessionsClient;
    private String projectId = "talent-hub-xoxy";

    public DialogflowService() throws IOException {
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream("freelancer/src/main/resources/talent-hub-xoxy-ce627abeef53.json"));
        SessionsSettings sessionsSettings = SessionsSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();
        this.sessionsClient = SessionsClient.create(sessionsSettings);
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
