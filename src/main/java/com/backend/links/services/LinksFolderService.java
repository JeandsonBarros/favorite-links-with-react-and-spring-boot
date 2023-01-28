package com.backend.links.services;

import com.backend.links.dto.LinksFolderDTO;
import com.backend.links.models.LinksFolderEntity;
import com.backend.links.models.UserEntity;
import com.backend.links.repository.LinksFolderRepository;
import com.backend.links.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LinksFolderService {

    @Autowired
    private LinksFolderRepository linksFolderRepository;
    @Autowired
    private UserService userService;

    public ResponseEntity<Object> getAllFolders(Pageable pageable) {
        try {
            UserEntity userEntity = userService.getUserDataLogged();
            return new ResponseEntity<>(linksFolderRepository.findByUserEntity(userEntity, pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getOneFolder(Long id) {
        try {

            Optional<LinksFolderEntity> linksFolderEntity = linksFolderRepository.findByUserEntityAndId(userService.getUserDataLogged(), id);

            if(!linksFolderEntity.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(linksFolderEntity.get(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> createNewLinksFolder(String linksFolderName) {
        try {

            UserEntity userEntity = userService.getUserDataLogged();

            LinksFolderEntity linksFolderEntity = new LinksFolderEntity();
            linksFolderEntity.setUserEntity(userEntity);
            linksFolderEntity.setName(linksFolderName);
            linksFolderEntity = linksFolderRepository.save(linksFolderEntity);

            return new ResponseEntity<>(linksFolderEntity, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Object> updateNewLinksFolder(String linksFolderName, Long id) {
        try {

            Optional<LinksFolderEntity> linksFolderEntity = linksFolderRepository.findByUserEntityAndId(userService.getUserDataLogged(), id);

            if(!linksFolderEntity.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            linksFolderEntity.get().setName(linksFolderName);
            linksFolderRepository.save(linksFolderEntity.get());

            return new ResponseEntity<>(linksFolderEntity.get(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Object> deleteLinksFolder(Long id){
        try {

            Optional<LinksFolderEntity> linksFolderEntity = linksFolderRepository.findByUserEntityAndId(userService.getUserDataLogged(), id);

            if(!linksFolderEntity.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            linksFolderRepository.delete(linksFolderEntity.get());

            return new ResponseEntity<>("folder deleted", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> findFolder(String name, Pageable pageable) {
        try {
            UserEntity userEntity = userService.getUserDataLogged();
            return new ResponseEntity<>(linksFolderRepository.findByUserEntityAndNameContaining(userEntity, name, pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
