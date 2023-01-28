package com.backend.links.security;

import com.backend.links.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
//@EnableMethodSecurity é preciso para poder usar o @PreAuthorize
@EnableMethodSecurity
public class WebSecurityConfiguration {

    @Autowired
    UserEntityRepository userEntityRepository;
    @Autowired
    JWTSecurityConfig jwtSecurityConfig;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .addFilterAfter(new JWTFilter(userEntityRepository, jwtSecurityConfig), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests()
                .requestMatchers("/").permitAll()
                .requestMatchers(HttpMethod.POST, "/email-for-forgot-password/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/user/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/users").hasAnyAuthority("ADMIN", "USER", "MASTER")
                .requestMatchers("/admins").hasAnyAuthority("ADMIN", "MASTER")
                .requestMatchers("/masters").hasAnyAuthority("MASTER")
                .anyRequest().authenticated()
                .and()
                .cors()
                .configurationSource(corsConfigurationSource())
        /*.httpBasic()*/;

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedMethods(List.of(
                HttpMethod.GET.name(),
                HttpMethod.PUT.name(),
                HttpMethod.POST.name(),
                HttpMethod.DELETE.name()
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration.applyPermitDefaultValues());
        return source;
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(
                "/v3/api-docs/**",
                "/swagger.json/**",
                "/swagger-ui/**",
                "/api/**"
                , "/ws-message/**"
                , "/topic/message/**"
                //,"/sendMessage/**"
        );
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
