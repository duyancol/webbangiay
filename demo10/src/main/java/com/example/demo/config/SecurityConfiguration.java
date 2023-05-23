package com.example.demo.config;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  private final LogoutHandler logoutHandler;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
//        .csrf()
//        .disable()
        .authorizeHttpRequests()
//            .requestMatchers("/**").permitAll()
            .requestMatchers("/api/v1/admin/**").hasAuthority("ADMIN")
           .requestMatchers("/images/img/**").permitAll()

        .requestMatchers("/api/v1/auth/**")
          .permitAll()

        .anyRequest()
          .authenticated();
//        .and()
//          .sessionManagement()
//          .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//        .and()
//        .authenticationProvider(authenticationProvider)
//        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
      http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
      http.exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
      http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      http.cors().and().csrf().disable();

//        .logout()
//        .logoutUrl("/api/v1/auth/logout")
//        .addLogoutHandler(logoutHandler)
//
//        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())

    ;

    return http.build();
  }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000") // Thay thế bằng URL của ứng dụng React
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*");
            }
        };
    }
}
