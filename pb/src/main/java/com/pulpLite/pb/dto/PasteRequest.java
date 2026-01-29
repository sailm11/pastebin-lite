package com.pulpLite.pb.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PasteRequest {

    @NotBlank
    private String content;

    @Min(1)
    private Integer ttlSeconds;

    @Min(1)
    private Integer maxViews;

    // getters and setters
}
