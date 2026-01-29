package com.pulpLite.pb.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "pastes")
@Data
public class Paste {

    @Id
    private String id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private Long createdAt;

    private Long expiresAt; // epoch ms

    private Integer maxViews;

    private Integer views;
}
