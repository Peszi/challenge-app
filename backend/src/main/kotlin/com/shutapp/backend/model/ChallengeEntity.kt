package com.shutapp.backend.model

import com.shutapp.backend.data.ChallengeDTO
import org.hibernate.validator.constraints.UniqueElements
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "challenge")
internal data class ChallengeEntity (
        @Id val id: String? = null,
        @Column(unique = true)
        val name: String? = null) {

    fun toDTO(): ChallengeDTO = ChallengeDTO(
        id = this.id!!,
        name = this.name!!
    )

    companion object {

        fun create(name: String) = ChallengeEntity(
                id = UUID.randomUUID().toString(),
                name = name
        )
    }
}