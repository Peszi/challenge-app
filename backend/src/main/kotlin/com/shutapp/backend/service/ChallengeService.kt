package com.shutapp.backend.service

import com.shutapp.backend.data.ChallengeDTO

interface ChallengeService {

    fun createChallenge(name: String): ChallengeDTO?

    fun getChallenge(id: Long): ChallengeDTO?

    fun getChallenges(): List<ChallengeDTO>

}