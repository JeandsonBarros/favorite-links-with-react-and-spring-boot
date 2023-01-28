package com.backend.links.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import io.jsonwebtoken.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class JWTCreator {

    //Creates the String token that will be sent to the user
    public static String create(String prefix, String key, JWTObject jwtObject) {

        try {

            String token = JWT.create()
                    .withSubject(jwtObject.getSubject())
                    /*.withIssuedAt(jwtObject.getIssuedAt())*/
                    .withClaim("userId", jwtObject.getUserId())
                    .withClaim("authorities", jwtObject.getRoles())
                    /*.withExpiresAt(jwtObject.getExpiration())*/
                    .sign(Algorithm.HMAC512(key));

            return prefix + " " + token;

        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }


    //passes String token data to a JWTObject object
    public static JWTObject create(String token, String prefix, String key) throws Exception {

        token = token.substring(7, token.length());

        JWTObject object = new JWTObject();

        var dataToken = JWT.require(Algorithm.HMAC512(key)).build().verify(token).getClaims();

        object.setSubject(dataToken.get("sub").asString());
        /*object.setExpiration(new Date(Long.parseLong(dataToken.get("exp").toString())));*/
        /*object.setIssuedAt(new Date(Long.parseLong(dataToken.get("iat").toString())));*/
        object.setUserId(Long.parseLong(dataToken.get("userId").toString()));
        object.setRoles(dataToken.get("authorities").asList(String.class));

        return object;

    }

}
