package com.pulpLite.pb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pulpLite.pb.model.Paste;

import jakarta.persistence.LockModeType;

public interface PasteRepository extends JpaRepository<Paste, String> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Paste p WHERE p.id = :id")
    Optional<Paste> findByIdForUpdate(@Param("id") String id);
}
