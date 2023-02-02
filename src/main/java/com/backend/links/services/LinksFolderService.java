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

import java.util.List;
import java.util.Optional;

@Service
public class LinksFolderService {

    @Autowired
    private LinksFolderRepository linksFolderRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private FavoriteLinkRepository favoriteLinkRepository;

    public ResponseEntity<Object> getAllFolders() {
        try {
            UserAuth userAuth = userService.getUserDataLogged();
            return new ResponseEntity<>(linksFolderRepository.findByUserAuth(userAuth), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getOneFolder(String folderName) {
        try {

            Optional<LinksFolder> linksFolder = linksFolderRepository.findByUserAuthAndName(userService.getUserDataLogged(), folderName);

            if(!linksFolder.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(linksFolder.get(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getFolderLinks(String folderName) {
        try {

            Optional<LinksFolder> linksFolder = linksFolderRepository.findByUserAuthAndName(userService.getUserDataLogged(), folderName);

            if(!linksFolder.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            List<FavoriteLink> favoriteLinkEntities = favoriteLinkRepository.findByUserAuthAndLinksFolder(userService.getUserDataLogged(), linksFolder.get());

            return new ResponseEntity<>(favoriteLinkEntities, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> createNewLinksFolder(String linksFolderName) {
        try {

            UserAuth userAuth = userService.getUserDataLogged();

            if(linksFolderRepository.findByUserAuthAndName(userAuth, linksFolderName).isPresent())
                return new ResponseEntity<>("A folder with that name already exists", HttpStatus.BAD_REQUEST);

            LinksFolder linksFolder = new LinksFolder();
            linksFolder.setUserAuth(userAuth);
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

            if(linksFolderRepository.findByUserAuthAndName(userService.getUserDataLogged(), linksFolderName).isPresent())
                return new ResponseEntity<>("A folder with that name already exists", HttpStatus.BAD_REQUEST);

            if(!linksFolder.isPresent())
                return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);

            if(linksFolder.get().getName().equals("root"))
                return new ResponseEntity<>("Root folder cannot be changed", HttpStatus.BAD_REQUEST);

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

            if(linksFolder.get().getName().equals("root"))
                return new ResponseEntity<>("Root folder cannot be deleted", HttpStatus.BAD_REQUEST);

            linksFolderRepository.delete(linksFolder.get());

            return new ResponseEntity<>("folder deleted", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> findFolder(String name) {
        try {
            UserAuth userAuth = userService.getUserDataLogged();
            return new ResponseEntity<>(linksFolderRepository.findByUserAuthAndNameContaining(userAuth, name), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
