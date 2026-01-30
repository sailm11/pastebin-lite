package com.pulpLite.pb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class PbApplication {

	public static void main(String[] args) {
		// Load local .env (if present) and expose values as system properties
		try {
			Dotenv dotenv = Dotenv.configure()
					.directory(".")
					.filename(".env")
					.load();
			dotenv.entries().forEach(entry -> {
				String key = entry.getKey();
				String value = entry.getValue();
				// don't override existing system properties or env vars
				if (System.getProperty(key) == null && System.getenv(key) == null && value != null) {
					System.setProperty(key, value);
				}
			});
		} catch (Exception e) {
			// ignore: .env may not exist in production
		}

		SpringApplication.run(PbApplication.class, args);
	}

}
