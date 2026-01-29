package com.pulpLite.pb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pulpLite.pb.model.Paste;
import com.pulpLite.pb.repository.PasteRepository;
import com.pulpLite.pb.util.TimeProvider;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class PasteService {

    @Autowired
    private PasteRepository repo;

    @Autowired
    private TimeProvider time;

    public Paste getValidPaste(String id, HttpServletRequest request) {
        Paste paste = repo.findById(id).orElse(null);
        if (paste == null)
            return null;

        long now = time.now(request);

        if (paste.getExpiresAt() != null && now > paste.getExpiresAt())
            return null;

        if (paste.getMaxViews() != null && paste.getViews() >= paste.getMaxViews())
            return null;

        return paste;
    }
}
