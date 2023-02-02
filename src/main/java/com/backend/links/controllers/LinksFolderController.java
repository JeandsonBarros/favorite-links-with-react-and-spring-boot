package com.backend.links.controllers;

import com.backend.links.dto.LinksFolderDTO;
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
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/links-folder")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Links folder")
public class LinksFolderController {

    @Autowired
    private LinksFolderService linksFolderService;

    @Operation(summary = "Get all link folders | Authority: ADMIN, MASTER, USER")
    @GetMapping
    public ResponseEntity<Object> getFolders(@RequestParam(required = false) String search){

        if(search != null)
            return linksFolderService.findFolder(search);

        return linksFolderService.getAllFolders();
    }

    @Operation(summary = "Get link folder info | Authority: ADMIN, MASTER, USER")
    @GetMapping("/{folderName}")
    public ResponseEntity<Object> getOneFolder(@PathVariable String folderName){
        return linksFolderService.getOneFolder(folderName);
    }

    @Operation(summary = "Get links from a folder of links by id | Authority: ADMIN, MASTER, USER")
    @GetMapping("/get-folder-links/{folderName}")
    public ResponseEntity<Object> getFolderLinks(@PathVariable String folderName){

        return linksFolderService.getFolderLinks(folderName);
    }

    @Operation(summary = "Save a link folder | Authority: ADMIN, MASTER, USER")
    @PostMapping
    public ResponseEntity<Object> postLinksFolder(@Valid @RequestBody LinksFolderDTO linksFolderDTO, BindingResult result){

        if(result.hasFieldErrors("name"))
            return new ResponseEntity<>("folder name is required", HttpStatus.BAD_REQUEST);

        return linksFolderService.createNewLinksFolder(linksFolderDTO.getName());
    }

    @Operation(summary = "Update link folder by id | Authority: ADMIN, MASTER, USER")
    @PutMapping("/{id}")
    public ResponseEntity<Object> putLinksFolder(@PathVariable Long id, @Valid @RequestBody LinksFolderDTO linksFolderDTO, BindingResult result){

        if(result.hasFieldErrors("name"))
            return new ResponseEntity<>("folder name is required", HttpStatus.BAD_REQUEST);

        return linksFolderService.updateNewLinksFolder(linksFolderDTO.getName(), id);
    }

    @Operation(summary = "Delete link folder by id | Authority: ADMIN, MASTER, USER")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteLinksFolder(@PathVariable Long id){
        return linksFolderService.deleteLinksFolder(id);
    }


}
