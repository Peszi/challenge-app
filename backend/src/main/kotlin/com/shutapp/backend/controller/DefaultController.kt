package com.shutapp.backend.controller

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@CrossOrigin("*")
@RestController
class DefaultController {

    @GetMapping("/hello")
    fun getHello() : String {
        return "kotlin";
    }

}