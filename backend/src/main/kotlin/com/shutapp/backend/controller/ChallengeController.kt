package com.shutapp.backend.controller

import com.shutapp.backend.data.ChallengeDTO
import com.shutapp.backend.service.ChallengeService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@CrossOrigin("*")
@RestController
class ChallengeController(val challengeService: ChallengeService) {

    @PostMapping("/challenge/{name}")
    fun createChallenge(@PathVariable name: String): ResponseEntity<ChallengeDTO> {
        return ResponseEntity(challengeService.createChallenge(name), HttpStatus.CREATED);
    }

}