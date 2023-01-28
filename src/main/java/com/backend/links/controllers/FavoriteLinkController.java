package com.backend.links.controllers;

import com.backend.links.dto.FavoriteLinkDTO;
import com.backend.links.services.FavoriteLinkService;
import com.backend.links.services.LinksFolderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Favorite link")
public class FavoriteLinkController {

    @Autowired
    private FavoriteLinkService favoriteLinkService;

    @Operation(summary = "Get saved bookmark links | Authority: ADMIN, MASTER, USER")
    @GetMapping
    public ResponseEntity<Object> getFavoritesLinks(@PageableDefault(size = 30, page = 0) Pageable paging, @RequestParam(required = false) String search) {

        Pageable pageable = PageRequest.of(paging.getPageNumber(), paging.getPageSize(), Sort.by(
                Sort.Order.asc("name")));

        if(search != null)
           return favoriteLinkService.findLinkByName(search, pageable);

        return favoriteLinkService.getAllLinks(pageable);

    }

    @Operation(summary = "Get saved favorite link by id | Authority: ADMIN, MASTER, USER")
    @GetMapping("/{id}")
    public ResponseEntity<Object> getFavoriteLink(@PathVariable Long id) {
        return favoriteLinkService.getLink(id);
    }

    @Operation(summary = "Save a favorite link | Authority: ADMIN, MASTER, USER")
    @PostMapping
    public ResponseEntity<Object> postFavoriteLink(@Valid @RequestBody FavoriteLinkDTO favoriteLinkDTO, BindingResult result){

        if (result.hasErrors())
            return listErrors(result);

        return favoriteLinkService.createFavoriteLink(favoriteLinkDTO);
    }

    @Operation(summary = "Fully update a bookmark link | Authority: ADMIN, MASTER, USER")
    @PutMapping("/{id}")
    public ResponseEntity<Object> putFavoriteLink(@PathVariable Long id, @Valid @RequestBody FavoriteLinkDTO favoriteLinkDTO, BindingResult result){

        if (result.hasErrors())
            return listErrors(result);

        return favoriteLinkService.updateFavoriteLink(favoriteLinkDTO, id);
    }

    @Operation(summary = "Partially update a favorite link | Authority: ADMIN, MASTER, USER")
    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchFavoriteLink(@PathVariable Long id, @RequestBody FavoriteLinkDTO favoriteLinkDTO){
        return favoriteLinkService.updateFavoriteLink(favoriteLinkDTO, id);
    }

    @Operation(summary = "Delete a favorite link by id | Authority: ADMIN, MASTER, USER")
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
