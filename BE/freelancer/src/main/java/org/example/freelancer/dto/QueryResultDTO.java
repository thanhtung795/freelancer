package org.example.freelancer.dto;

public class QueryResultDTO {
    private String queryText;
    private String intentName;
    private String fulfillmentText;

    public QueryResultDTO(String queryText, String intentName, String fulfillmentText) {
        this.queryText = queryText;
        this.intentName = intentName;
        this.fulfillmentText = fulfillmentText;
    }

    public String getQueryText() {
        return queryText;
    }

    public void setQueryText(String queryText) {
        this.queryText = queryText;
    }

    public String getIntentName() {
        return intentName;
    }

    public void setIntentName(String intentName) {
        this.intentName = intentName;
    }

    public String getFulfillmentText() {
        return fulfillmentText;
    }

    public void setFulfillmentText(String fulfillmentText) {
        this.fulfillmentText = fulfillmentText;
    }
}
