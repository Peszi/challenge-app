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

    @GetMapping("/challenge/valid/{name}")
    fun checkChallengeName(@PathVariable name: String): ResponseEntity<String> {
        return ResponseEntity(challengeService.checkChallengeName(name), HttpStatus.OK)
    }

    @PostMapping("/challenge/{name}")
    fun createChallenge(@PathVariable name: String): ResponseEntity<ChallengeDTO> {
        return ResponseEntity(challengeService.createChallenge(name), HttpStatus.CREATED)
    }

    @GetMapping("/challenge/{name}")
    fun getChallenge(@PathVariable name: String): ResponseEntity<ChallengeDTO> {
        return ResponseEntity(challengeService.getChallenge(name), HttpStatus.OK)
    }

    @GetMapping("/challenges")
    fun getChallenges(): ResponseEntity<List<ChallengeDTO>> {
        return ResponseEntity(challengeService.getChallenges(), HttpStatus.OK)
    }

}