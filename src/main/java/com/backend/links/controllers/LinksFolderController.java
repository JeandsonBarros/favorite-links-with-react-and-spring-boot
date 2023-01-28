package com.backend.links.controllers;

import com.backend.links.dto.LinksFolderDTO;
import com.backend.links.services.LinksFolderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/links-folder")
public class LinksFolderController {

    @Autowired
    private LinksFolderService linksFolderService;

    @GetMapping
    public ResponseEntity<Object> getFolders(@PageableDefault(size = 10, page = 0) Pageable pageable, @RequestParam(required = false) String search){

        if(search != null)
            return linksFolderService.findFolder(search, pageable);

        return linksFolderService.getAllFolders(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneFolder(@PathVariable Long id){
        return linksFolderService.getOneFolder(id);
    }

    @PostMapping
    public ResponseEntity<Object> postLinksFolder(@Valid @RequestBody LinksFolderDTO linksFolderDTO, BindingResult result){

        if(result.hasFieldErrors("name"))
            return new ResponseEntity<>("folder name is required", HttpStatus.BAD_REQUEST);

        return linksFolderService.createNewLinksFolder(linksFolderDTO.getName());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> putLinksFolder(@PathVariable Long id, @Valid @RequestBody LinksFolderDTO linksFolderDTO, BindingResult result){

        if(result.hasFieldErrors("name"))
            return new ResponseEntity<>("folder name is required", HttpStatus.BAD_REQUEST);

        return linksFolderService.updateNewLinksFolder(linksFolderDTO.getName(), id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteLinksFolder(@PathVariable Long id){
        return linksFolderService.deleteLinksFolder(id);
    }


}
