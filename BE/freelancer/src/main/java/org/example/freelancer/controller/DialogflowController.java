//package org.example.freelancer.controller;
//import org.example.freelancer.service.Impl.DialogflowService;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/dialogflow")
//public class DialogflowController {
//
//    private final DialogflowService dialogflowService;
//
//    public DialogflowController(DialogflowService dialogflowService) {
//        this.dialogflowService = dialogflowService;
//    }
//
//    @PostMapping("/send")
//    public String sendMessage(@RequestParam String message) throws Exception {
//        String sessionId = "unique-session-id";
//        return dialogflowService.detectIntentTexts(sessionId, message, "vi");
//    }
//}
