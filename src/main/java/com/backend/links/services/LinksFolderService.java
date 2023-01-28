package com.backend.links.services;

import com.backend.links.models.FavoriteLink;
import com.backend.links.models.LinksFolder;
import com.backend.links.models.UserAuth;
import com.backend.links.repository.FavoriteLinkRepository;
import com.backend.links.repository.LinksFolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @Autowired
    private FavoriteLinkRepository favoriteLinkRepository;

    public ResponseEntity<Object> getAllFolders(Pageable pageable) {
        try {
            UserAuth userAuth = userService.getUserDataLogged();
            return new ResponseEntity<>(linksFolderRepository.findByUserAuth(userAuth, pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getOneFolder(Long id) {
        try {

            Optional<LinksFolder> linksFolder = linksFolderRepository.findByUserAuthAndId(userService.getUserDataLogged(), id);

            if(!linksFolder.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(linksFolder.get(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getFolderLinks(Long id,  Pageable pageable) {
        try {

            Optional<LinksFolder> linksFolder = linksFolderRepository.findByUserAuthAndId(userService.getUserDataLogged(), id);

            if(!linksFolder.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            Page<FavoriteLink> favoriteLinkEntities = favoriteLinkRepository.findByUserAuthAndLinksFolder(userService.getUserDataLogged(), linksFolder.get(), pageable);

            return new ResponseEntity<>(favoriteLinkEntities, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> createNewLinksFolder(String linksFolderName) {
        try {

            UserAuth userAuth = userService.getUserDataLogged();

            LinksFolder linksFolder = new LinksFolder();
            linksFolder.setUserEntity(userAuth);
            linksFolder.setName(linksFolderName);
            linksFolder = linksFolderRepository.save(linksFolder);

            return new ResponseEntity<>(linksFolder, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Object> updateNewLinksFolder(String linksFolderName, Long id) {
        try {

            Optional<LinksFolder> linksFolder = linksFolderRepository.findByUserAuthAndId(userService.getUserDataLogged(), id);

            if(!linksFolder.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            linksFolder.get().setName(linksFolderName);
            linksFolderRepository.save(linksFolder.get());

            return new ResponseEntity<>(linksFolder.get(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Object> deleteLinksFolder(Long id){
        try {

            Optional<LinksFolder> linksFolder = linksFolderRepository.findByUserAuthAndId(userService.getUserDataLogged(), id);

            if(!linksFolder.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            linksFolderRepository.delete(linksFolder.get());

            return new ResponseEntity<>("folder deleted", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> findFolder(String name, Pageable pageable) {
        try {
            UserAuth userAuth = userService.getUserDataLogged();
            return new ResponseEntity<>(linksFolderRepository.findByUserAuthAndNameContaining(userAuth, name, pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
