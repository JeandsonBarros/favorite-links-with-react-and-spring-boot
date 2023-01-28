package com.backend.links.security;

import com.backend.links.models.Role;
import com.backend.links.repository.UserAuthRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

public class JWTFilter extends OncePerRequestFilter {

    UserAuthRepository userAuthRepository;
    JWTSecurityConfig jwtSecurityConfig;

    public JWTFilter(UserAuthRepository userAuthRepository, JWTSecurityConfig jwtSecurityConfig) {
        this.userAuthRepository = userAuthRepository;
        this.jwtSecurityConfig = jwtSecurityConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        //get the request token with AUTHORIZATION
        String token = request.getHeader("Authorization");

        //this implementation is only validating the integrity of the token
        try {
            if (token != null && !token.isEmpty()) {

                JWTObject tokenObject = JWTCreator.create(token, jwtSecurityConfig.getPrefix(), jwtSecurityConfig.getKey());

                var user = userAuthRepository.findById(tokenObject.getUserId());

                if (!user.isPresent()){
                    response.setStatus(HttpStatus.NOT_FOUND.value());
                    return;
                }

                Collection<GrantedAuthority> authorities = new ArrayList<>();
                for(Role role: user.get().getRoles()) {
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getRole());
                    authorities.add(authority);
                }

                var userDetails = new User(user.get().getEmail(), user.get().getPassword(), true, true, true, true, authorities);

                UsernamePasswordAuthenticationToken userToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                authorities);

                SecurityContextHolder.getContext().setAuthentication(userToken);

            } else {
                SecurityContextHolder.clearContext();
            }

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            System.out.println("Error");
            e.printStackTrace();
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
    }


}
