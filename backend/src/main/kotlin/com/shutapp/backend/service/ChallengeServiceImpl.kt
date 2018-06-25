package com.shutapp.backend.service

import com.shutapp.backend.data.ChallengeDTO
import com.shutapp.backend.exception.BadRequestException
import com.shutapp.backend.model.ChallengeEntity
import com.shutapp.backend.repository.ChallengeRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
internal class ChallengeServiceImpl(val challengeRepository: ChallengeRepository) : ChallengeService {

    override fun createChallenge(name: String): ChallengeDTO? {
        challengeRepository.findByName(name) ?: return challengeRepository.save(ChallengeEntity.create(name)).toDTO()
        throw BadRequestException("Name in use!")
    }

    override fun getChallenge(id: Long): ChallengeDTO? {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getChallenges(): List<ChallengeDTO> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}