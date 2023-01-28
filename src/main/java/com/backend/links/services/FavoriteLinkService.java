package com.backend.links.services;

import com.backend.links.dto.FavoriteLinkDTO;
import com.backend.links.models.FavoriteLinkEntity;
import com.backend.links.models.LinksFolderEntity;
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
            return new ResponseEntity<>(favoriteLinkRepository.findByUserEntity(userService.getUserDataLogged(), pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error getting list of links", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Object> getLink(Long id) {
        try {
            Optional<FavoriteLinkEntity> favoriteLinkEntity = favoriteLinkRepository.findByUserEntityAndId(userService.getUserDataLogged(), id);

            if(!favoriteLinkEntity.isPresent()) {
                return new ResponseEntity<>("link not found", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(favoriteLinkEntity.get(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error getting list of links", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> findLinkByName(String search, Pageable pageable) {
        try {
            return new ResponseEntity<>(favoriteLinkRepository.findByUserEntityAndNameContaining(userService.getUserDataLogged(), search, pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error fetching list of links", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> createFavoriteLink(FavoriteLinkDTO favoriteLinkDTO) {
        try {

            FavoriteLinkEntity favoriteLinkEntity = new FavoriteLinkEntity();
            BeanUtils.copyProperties(favoriteLinkDTO, favoriteLinkEntity);
            favoriteLinkEntity.setUserEntity(userService.getUserDataLogged());

            if (favoriteLinkDTO.getFolderId() != null) {
                Optional<LinksFolderEntity> folder = linksFolderRepository.findByUserEntityAndId(userService.getUserDataLogged(), favoriteLinkDTO.getFolderId());
                if (folder.isPresent())
                    favoriteLinkEntity.setLinksFolderEntity(folder.get());
                else
                    return new ResponseEntity<>("folder not found", HttpStatus.NOT_FOUND);
            }

            favoriteLinkEntity = favoriteLinkRepository.save(favoriteLinkEntity);

            return new ResponseEntity<>(favoriteLinkEntity, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error saving bookmark link", HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    public ResponseEntity<Object> updateFavoriteLink(FavoriteLinkDTO favoriteLinkDTO, Long id) {
        try {

            Optional<FavoriteLinkEntity> favoriteLinkEntity = favoriteLinkRepository.findByUserEntityAndId(userService.getUserDataLogged(), id);

            if(!favoriteLinkEntity.isPresent()) {
                return new ResponseEntity<>("link not found", HttpStatus.NOT_FOUND);
            }

            if(favoriteLinkDTO.getName() != null && !favoriteLinkDTO.getName().isEmpty())
                favoriteLinkEntity.get().setName(favoriteLinkDTO.getName());

            if(favoriteLinkDTO.getUrl() != null && !favoriteLinkDTO.getUrl().isEmpty())
                favoriteLinkEntity.get().setUrl(favoriteLinkDTO.getUrl());

            if(favoriteLinkDTO.getFolderId() != null) {
                Optional<LinksFolderEntity> folderLinks = linksFolderRepository.findByUserEntityAndId(userService.getUserDataLogged(), favoriteLinkDTO.getFolderId());
                if(folderLinks.isPresent())
                    favoriteLinkEntity.get().setLinksFolderEntity(folderLinks.get());
                else
                    return new ResponseEntity<>("folder by id "+favoriteLinkDTO.getFolderId()+" not found", HttpStatus.NOT_FOUND);
            }else
                favoriteLinkEntity.get().setLinksFolderEntity(null);


            favoriteLinkRepository.save(favoriteLinkEntity.get());

            return new ResponseEntity<>(favoriteLinkEntity.get(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error saving bookmark link", HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    public ResponseEntity<Object> deleFavoriteLink(Long id) {

        try{

            Optional<FavoriteLinkEntity> favoriteLinkEntity = favoriteLinkRepository.findByUserEntityAndId(userService.getUserDataLogged(), id);

            if(!favoriteLinkEntity.isPresent()) {
                return new ResponseEntity<>("link not found", HttpStatus.NOT_FOUND);
            }

            favoriteLinkRepository.delete(favoriteLinkEntity.get());

            return new ResponseEntity<>("favorite link deleted", HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
