package com.pulpLite.pb.controller;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import com.pulpLite.pb.dto.PasteRequest;
import com.pulpLite.pb.model.Paste;
import com.pulpLite.pb.repository.PasteRepository;
import com.pulpLite.pb.util.TimeProvider;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@CrossOrigin
public class PasteController {

    @Autowired
    private PasteRepository repo;

    @Autowired
    private TimeProvider timeProvider;

    @GetMapping("/api/healthz")
    public ResponseEntity<Map<String, Boolean>> health() {
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/api/pastes")
    public ResponseEntity<?> createPaste(
            @Valid @RequestBody PasteRequest request,
            HttpServletRequest httpRequest) {

        Paste paste = new Paste();
        paste.setId(UUID.randomUUID().toString());
        paste.setContent(request.getContent());
        paste.setCreatedAt(timeProvider.now(httpRequest));
        paste.setViews(0);

        if (request.getTtlSeconds() != null) {
            paste.setExpiresAt(
                    timeProvider.now(httpRequest) + request.getTtlSeconds() * 1000L);
        }

        if (request.getMaxViews() != null) {
            paste.setMaxViews(request.getMaxViews());
        }

        repo.save(paste);

        return ResponseEntity.ok(Map.of(
                "id", paste.getId(),
                "url", "/api/pastes/" + paste.getId()));
    }

    @Transactional
    @GetMapping("/api/pastes/{id}")
    public ResponseEntity<?> getPaste(
            @PathVariable String id,
            HttpServletRequest request) {

        Paste paste = repo.findByIdForUpdate(id).orElse(null);

        if (paste == null) {
            return notFound();
        }

        long now = timeProvider.now(request);

        if (paste.getExpiresAt() != null && now > paste.getExpiresAt()) {
            return notFound();
        }

        if (paste.getMaxViews() != null &&
                paste.getViews() >= paste.getMaxViews()) {
            return notFound();
        }

        paste.setViews(paste.getViews() + 1);
        repo.save(paste);

        Integer remainingViews = paste.getMaxViews() == null
                ? null
                : paste.getMaxViews() - paste.getViews();

        Map<String, Object> response = new HashMap<>();
        response.put("content", paste.getContent());
        response.put("remaining_views", remainingViews);
        response.put("expires_at", paste.getExpiresAt() == null
                ? null
                : Instant.ofEpochMilli(paste.getExpiresAt()).toString());
        return ResponseEntity.ok(response);
    }

    @Transactional
    @GetMapping("/p/{id}")
    public ResponseEntity<String> viewPaste(
            @PathVariable String id,
            HttpServletRequest request) {

        ResponseEntity<?> response = getPaste(id, request);

        if (!response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(404).body("Not Found");
        }

        Map<?, ?> body = (Map<?, ?>) response.getBody();
        String content = (String) body.get("content");

        String safeContent = HtmlUtils.htmlEscape(content);

        return ResponseEntity.ok("""
                <html>
                <body>
                    <pre>%s</pre>
                </body>
                </html>
                """.formatted(safeContent));
    }

    private ResponseEntity<Map<String, String>> notFound() {
        return ResponseEntity.status(404)
                .body(Map.of("error", "Paste not found"));
    }

}
