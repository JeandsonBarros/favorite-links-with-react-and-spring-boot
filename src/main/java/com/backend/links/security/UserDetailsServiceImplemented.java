package com.backend.links.security;

import com.backend.links.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class UserDetailsServiceImplemented implements UserDetailsService {

    @Autowired
    private UserEntityRepository userEntityRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        var userEntity = userEntityRepository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with username:" + username)
        );

        Set<GrantedAuthority> authorities = new HashSet<>();
        userEntity.getRoles().forEach(roleEntity -> {
            authorities.add(new SimpleGrantedAuthority(roleEntity.getRole()));
        });

        return new User(userEntity.getEmail(), userEntity.getPassword(), true, true, true, true, authorities);
    }
}
