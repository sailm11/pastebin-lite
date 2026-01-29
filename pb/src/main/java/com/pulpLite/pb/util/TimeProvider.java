package com.pulpLite.pb.util;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class TimeProvider {

    public long now(HttpServletRequest request) {
        if ("1".equals(System.getenv("TEST_MODE"))) {
            String header = request.getHeader("x-test-now-ms");
            if (header != null) {
                return Long.parseLong(header);
            }
        }
        return System.currentTimeMillis();
    }
}
