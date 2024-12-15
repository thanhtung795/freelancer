package org.example.freelancer.repository;

import org.example.freelancer.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findBySenderIdAndReceiverIdOrderBySentAtDesc(Integer senderId, Integer receiverId);

    @Query("SELECT m FROM Message m WHERE (m.sender.id = ?1 AND m.receiver.id = ?2) OR (m.sender.id = ?2 AND m.receiver.id = ?1) ORDER BY m.sentAt DESC")
    List<Message> findConversation(Integer user1Id, Integer user2Id);

    List<Message> findByJobIdOrderBySentAtDesc(Integer jobId);
}
