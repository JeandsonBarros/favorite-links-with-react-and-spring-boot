package com.backend.links.services;

import com.backend.links.dto.FavoriteLinkDTO;
import com.backend.links.models.FavoriteLink;
import com.backend.links.models.LinksFolder;
import com.backend.links.repository.FavoriteLinkRepository;
import com.backend.links.repository.LinksFolderRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FavoriteLinkService {

    @Autowired
    private LinksFolderRepository linksFolderRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private FavoriteLinkRepository favoriteLinkRepository;

    public ResponseEntity<Object> getAllLinks(Pageable pageable) {
        try {
            return new ResponseEntity<>(favoriteLinkRepository.findByUserAuth(userService.getUserDataLogged(), pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error getting list of links", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Object> getLink(Long id) {
        try {
            Optional<FavoriteLink> favoriteLink = favoriteLinkRepository.findByUserAuthAndId(userService.getUserDataLogged(), id);

            if(!favoriteLink.isPresent()) {
                return new ResponseEntity<>("link not found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(favoriteLink.get(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error getting list of links", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> findLinkByName(String search, Pageable pageable) {
        try {
            return new ResponseEntity<>(favoriteLinkRepository.findByUserAuthAndNameContaining(userService.getUserDataLogged(), search, pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error fetching list of links", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> createFavoriteLink(FavoriteLinkDTO favoriteLinkDTO) {
        try {

            FavoriteLink favoriteLink = new FavoriteLink();
            BeanUtils.copyProperties(favoriteLinkDTO, favoriteLink);
            favoriteLink.setUserEntity(userService.getUserDataLogged());

            if (favoriteLinkDTO.getFolderId() != null) {
                Optional<LinksFolder> folder = linksFolderRepository.findByUserAuthAndId(userService.getUserDataLogged(), favoriteLinkDTO.getFolderId());
                if (folder.isPresent())
                    favoriteLink.setLinksFolder(folder.get());
                else
                    return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);
            }

            favoriteLink = favoriteLinkRepository.save(favoriteLink);

            return new ResponseEntity<>(favoriteLink, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error saving bookmark link", HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    public ResponseEntity<Object> updateFavoriteLink(FavoriteLinkDTO favoriteLinkDTO, Long id) {
        try {

            Optional<FavoriteLink> favoriteLink = favoriteLinkRepository.findByUserAuthAndId(userService.getUserDataLogged(), id);

            if(!favoriteLink.isPresent()) {
                return new ResponseEntity<>("link not found", HttpStatus.NOT_FOUND);
            }

            if(favoriteLinkDTO.getName() != null && !favoriteLinkDTO.getName().isEmpty())
                favoriteLink.get().setName(favoriteLinkDTO.getName());

            if(favoriteLinkDTO.getUrl() != null && !favoriteLinkDTO.getUrl().isEmpty())
                favoriteLink.get().setUrl(favoriteLinkDTO.getUrl());

            if(favoriteLinkDTO.getFolderId() != null) {
                Optional<LinksFolder> folderLinks = linksFolderRepository.findByUserAuthAndId(userService.getUserDataLogged(), favoriteLinkDTO.getFolderId());
                if(folderLinks.isPresent())
                    favoriteLink.get().setLinksFolder(folderLinks.get());
                else
                    return new ResponseEntity<>("folder by id "+favoriteLinkDTO.getFolderId()+" not found", HttpStatus.NOT_FOUND);
            }else
                favoriteLink.get().setLinksFolder(null);


            favoriteLinkRepository.save(favoriteLink.get());

            return new ResponseEntity<>(favoriteLink.get(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error saving bookmark link", HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    public ResponseEntity<Object> deleFavoriteLink(Long id) {

        try{

            Optional<FavoriteLink> favoriteLink = favoriteLinkRepository.findByUserAuthAndId(userService.getUserDataLogged(), id);

            if(!favoriteLink.isPresent()) {
                return new ResponseEntity<>("link not found", HttpStatus.NOT_FOUND);
            }

            favoriteLinkRepository.delete(favoriteLink.get());

            return new ResponseEntity<>("favorite link deleted", HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
