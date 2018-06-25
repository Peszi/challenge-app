package com.shutapp.backend.repository

import com.shutapp.backend.model.ChallengeEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
internal interface ChallengeRepository : JpaRepository<ChallengeEntity, Long> {

//    override fun findByName(id: String)

    fun findByName(name: String): ChallengeEntity?

}