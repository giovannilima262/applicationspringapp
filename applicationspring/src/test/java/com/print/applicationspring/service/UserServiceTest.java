package com.print.applicationspring.service;

import com.print.applicationspring.model.Product;
import com.print.applicationspring.model.User;
import com.print.applicationspring.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService = new UserService();

    @Test
    public void testSave() {
        User user = oneUser();
        userService.save(user);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testFindByNamePassword() {
        User user = oneUser();
        userService.findByNamePassword(user);
        verify(userRepository, times(1)).findByNamePassword(user.getEmail(), user.getPassword());
    }


    @Test
    public void testFindByNamePasswordReturnOne() {
        User user = oneUser();
        when(userRepository.findByNamePassword(user.getEmail(), user.getPassword())).thenReturn(user);
        User userOptional = userService.findByNamePassword(user);
        assertEquals(userOptional, user);
    }

    private User oneUser() {
        User user = new User();
        user.setId(1L);
        user.setName("Teste");
        user.setEmail("Teste");
        user.setPassword("Teste");
        return user;
    }
}
