package com.converter.controller;

import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.converter.service.YouTubeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/youtube")
@CrossOrigin(origins = "https://mp3frontend.vercel.app")
public class YouTubeController {

	 private final YouTubeService youTubeService;
	 
	 @GetMapping("/convert")
	    public ResponseEntity<InputStreamResource> convert(
	            @RequestParam String url) throws Exception {

	        Path mp3File = youTubeService.convertToMp3(url);

	        InputStreamResource resource =
	                new InputStreamResource(Files.newInputStream(mp3File));

	        return ResponseEntity.ok()
	                .contentType(MediaType.parseMediaType("audio/mpeg"))
	                .header(
	                        HttpHeaders.CONTENT_DISPOSITION,
	                        "attachment; filename=\"youtube-audio.mp3\""
	                )
	                .contentLength(Files.size(mp3File))
	                .body(resource);
	    }
}
