package com.print.applicationspring.repository;

import com.print.applicationspring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "select u from User u where u.email = :email and u.password = :password")
    User findByNamePassword(String email, String password);

}
