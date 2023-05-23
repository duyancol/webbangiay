package com.example.demo.auth;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
      @RequestBody RegisterRequest request
  ) {
    return ResponseEntity.ok(service.register(request));
  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }
  @Autowired AuthenticationService authenticationService;
  @Autowired
  UserRepository userRepository;
  @PutMapping("/users/updateRole")
  public void updateRole(@RequestParam("email") String email, @RequestParam("role") String role) {
    authenticationService.updateUserRole(email,role);
  }
  @GetMapping("/users/userAll")
  public List<AuthenticationResponse> getUserAll() {
  return  authenticationService.findAll();

  }
  @GetMapping("/users/getByEmail")
  public AuthenticationResponse getUserByID(@RequestParam("email") String email) {
    return  authenticationService.getUserByID(email);

  }
  @GetMapping("/users/forotPass")
  public String getForgot(@RequestParam("email") String email) {
    return  authenticationService.processForgotPasswordForm(email);

  }
  @GetMapping("/reset_password/{token}")
  public String showResetPasswordForm(@PathVariable String token) {
    User customer = userRepository.findByResetPasswordToken(token);


    if (customer == null) {

      return "message";
    }

    return "reset_password_form";
  }
  @PutMapping("/users/updatePass")
  public void updatePass(@RequestParam("token") String token, @RequestParam("passnew") String passnew) {
    authenticationService.updatePassword(token,passnew);
  }
}
