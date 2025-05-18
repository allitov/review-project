package ru.sibsutis.reviewproject.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.sibsutis.reviewproject.dto.request.ArticleRequest;
import ru.sibsutis.reviewproject.dto.response.ArticleListResponse;
import ru.sibsutis.reviewproject.dto.response.ArticleResponse;
import ru.sibsutis.reviewproject.service.ArticleService;

@Slf4j
@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("/{authorId}")
    @ResponseStatus(HttpStatus.OK)
    public ArticleListResponse findByAuthorId(@PathVariable("authorId") Long authorId) {
        log.info("Find articles by author id: {}", authorId);
        return articleService.findByAuthorId(authorId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ArticleResponse createArticle(@RequestBody ArticleRequest request) {
        log.info("Create article: {}", request);
        return articleService.createArticle(request);
    }

    @GetMapping("/not-reviewed")
    @ResponseStatus(HttpStatus.OK)
    public ArticleListResponse findAllNotReviewed() {
        log.info("Find all not reviewed articles");

        return articleService.findAllNotReviewed();
    }
}
