package com.dorecipe.main.security.secure.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;



import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import com.dorecipe.main.security.secure.services.UserDetailsImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);


  @Value("${bezkoder.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(UserDetailsImpl userPrincipal) {
    return generateTokenFromUsername(userPrincipal.getUsername());
  }

  private static final Key SECRET_KEY = Keys.hmacShaKeyFor(Base64.getUrlEncoder().encode("MyNickNameisErjuerAndNameisMinsuButTHisISTOOshortasAhamacSHaKeytryAgain".getBytes()));
  
  public String generateTokenFromUsername(String username) {
    return Jwts.builder().setSubject(username).setIssuedAt(new Date())
//      .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)).signWith(SignatureAlgorithm.HS512, jwtSecret)//deprecated
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)).signWith(SECRET_KEY,SignatureAlgorithm.HS512)
        .compact();
  }

  public String getUserNameFromJwtToken(String token) {
	    return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody().getSubject();
//    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();//deprecated
  }

  public boolean validateJwtToken(String authToken) {
    try {
//      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);	//deprecated
      Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(authToken);
      return true;
//    } catch (SignatureException e) {//deprecated
    } catch (SecurityException e) {
      logger.error("Invalid JWT signature: {}", e.getMessage());
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }

}