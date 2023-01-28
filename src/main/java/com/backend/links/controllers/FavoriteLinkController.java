package com.backend.links.controllers;

import com.backend.links.dto.FavoriteLinkDTO;
import com.backend.links.services.FavoriteLinkService;
import com.backend.links.services.LinksFolderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("/favorite-link")
public class FavoriteLinkController {

    @Autowired
    private FavoriteLinkService favoriteLinkService;

    @GetMapping
    public ResponseEntity<Object> getFavoritesLinks(@PageableDefault(size = 30, page = 0) Pageable pageable, @RequestParam(required = false) String search) {

        if(search != null)
           return favoriteLinkService.findLinkByName(search, pageable);

        return favoriteLinkService.getAllLinks(pageable);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getFavoriteLink(@PathVariable Long id) {
        return favoriteLinkService.getLink(id);
    }

    @PostMapping
    public ResponseEntity<Object> postFavoriteLink(@Valid @RequestBody FavoriteLinkDTO favoriteLinkDTO, BindingResult result){

        if (result.hasErrors())
            return listErrors(result);

        return favoriteLinkService.createFavoriteLink(favoriteLinkDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> putFavoriteLink(@PathVariable Long id, @Valid @RequestBody FavoriteLinkDTO favoriteLinkDTO, BindingResult result){

        if (result.hasErrors())
            return listErrors(result);

        return favoriteLinkService.updateFavoriteLink(favoriteLinkDTO, id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchFavoriteLink(@PathVariable Long id, @RequestBody FavoriteLinkDTO favoriteLinkDTO){
        return favoriteLinkService.updateFavoriteLink(favoriteLinkDTO, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteFavoriteLink(@PathVariable Long id){
        return favoriteLinkService.deleFavoriteLink(id);
    }

    public ResponseEntity<Object> listErrors(BindingResult result) {

        var erros = new ArrayList<>();

        for (ObjectError objectError : result.getAllErrors()) {
            String defaultMessage = objectError.getDefaultMessage();
            erros.add(defaultMessage);
        }

        return new ResponseEntity<>(erros, HttpStatus.BAD_REQUEST);
    }


}
