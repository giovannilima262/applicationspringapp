package com.print.applicationspring.service;

import com.print.applicationspring.model.User;
import com.print.applicationspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void save(User user) {
        userRepository.save(user);
    }

    public User findByNamePassword(User user) {
        return userRepository.findByNamePassword(user.getEmail(), user.getPassword());
    }

}
