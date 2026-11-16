package com.converter.service;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

@Service
public class YouTubeService {

	public Path convertToMp3(String url) throws Exception {

		// Validate YouTube URL
		URI uri = URI.create(url);

		String host = uri.getHost();

		if (!"youtube.com".equals(host) && !"www.youtube.com".equals(host) && !"m.youtube.com".equals(host)
				&& !"youtu.be".equals(host)) {
			
			throw new IllegalArgumentException("Invalid YouTube URL");
		}

		if (!"https".equalsIgnoreCase(uri.getScheme())) {
			
			throw new IllegalArgumentException("HTTPS URL required");
		}

		// Create temporary directory
		Path outputDir = Files.createTempDirectory("youtube-mp3-");

		Path logFile = outputDir.resolve("conversion.log");

		// yt-dlp command
		String ytDlpPath = System.getenv("YT_DLP_PATH");
		if (ytDlpPath == null || ytDlpPath.isBlank()) {
			ytDlpPath = "yt-dlp";
		}

		ProcessBuilder processBuilder = new ProcessBuilder(
				ytDlpPath, 
				"--no-playlist", 
				"-x", "--audio-format", "mp3",
				"--audio-quality", "192K", "-o", 
				outputDir.resolve("%(id)s.%(ext)s").toString(), url);

		processBuilder.redirectErrorStream(true);
		processBuilder.redirectOutput(logFile.toFile());

		Process process = processBuilder.start();

		boolean completed = process.waitFor(10, TimeUnit.MINUTES);

		if (!completed) {
			process.destroyForcibly();
			throw new RuntimeException("Conversion timed out");
		}

		if (process.exitValue() != 0) {
			String error = Files.readString(logFile);
			throw new RuntimeException("Conversion failed: " + error);
		}

		// Find converted MP3
		try (var files = Files.list(outputDir)) {

			return files.filter(path -> path.toString().endsWith(".mp3")).findFirst()
					.orElseThrow(() -> new RuntimeException("MP3 file not generated"));
		}
	}
}
