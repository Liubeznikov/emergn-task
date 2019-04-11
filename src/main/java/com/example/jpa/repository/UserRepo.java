package com.example.jpa.repository;

import com.example.jpa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;



import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {


     List<User> findByName (String name);
     List<User> findByLogin (String login);

}
