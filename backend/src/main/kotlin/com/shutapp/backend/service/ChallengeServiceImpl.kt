package com.shutapp.backend.service

import com.shutapp.backend.data.ChallengeDTO
import com.shutapp.backend.exception.BadRequestException
import com.shutapp.backend.exception.NotFoundException
import com.shutapp.backend.model.ChallengeEntity
import com.shutapp.backend.repository.ChallengeRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
internal class ChallengeServiceImpl(val challengeRepository: ChallengeRepository) : ChallengeService {

    override fun checkChallengeName(name: String): String {
        challengeRepository.findByName(name)?.let { throw BadRequestException("Name in use!") } ?: return "Name available!"
    }

    override fun createChallenge(name: String): ChallengeDTO? {
        challengeRepository.findByName(name) ?: return challengeRepository.save(ChallengeEntity.create(name)).toDTO()
        throw BadRequestException("Name in use!")
    }

    override fun getChallenge(name: String): ChallengeDTO? {
        return challengeRepository.findByName(name)?.toDTO() ?: throw NotFoundException("Challenge not found!")
    }

    override fun getChallenges(): List<ChallengeDTO> {
        return challengeRepository.findAll().map { it.toDTO() }
    }
}