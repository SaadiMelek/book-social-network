package com.mlk.book.usr;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<com.mlk.book.usr.User, Long> {
    Optional<com.mlk.book.usr.User> findByEmail(String email);
}
