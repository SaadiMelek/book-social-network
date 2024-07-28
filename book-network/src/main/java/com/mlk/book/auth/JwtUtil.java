package com.mlk.book.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtil {

    private static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String generateToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 8640000)) // 1 day expiry
                .signWith(key)
                .compact();
    }

    public static SecretKey getKey() {
        return key;
    }

    public static void main(String[] args) {
        System.out.println(generateToken("saadi.melek@gmail"));
    }
}
