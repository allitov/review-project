package ru.sibsutis.reviewproject.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.sibsutis.reviewproject.dto.request.ArticleRequest;
import ru.sibsutis.reviewproject.dto.response.ArticleListResponse;
import ru.sibsutis.reviewproject.dto.response.ArticleResponse;
import ru.sibsutis.reviewproject.entity.Article;
import ru.sibsutis.reviewproject.mapper.ArticleMapper;
import ru.sibsutis.reviewproject.repository.ArticleRepository;
import ru.sibsutis.reviewproject.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;

    private final UserRepository userRepository;

    public ArticleListResponse findByAuthorId(Long authorId) {
        List<Article> articles = articleRepository.findByAuthorId(authorId);

        return articleMapper.toArticleListResponse(articles);
    }

    public ArticleResponse createArticle(ArticleRequest request) {
        Article article = articleMapper.toArticleEntity(request);
        article.setAuthor(userRepository.findById(request.getAuthorId()).orElseThrow());
        article.setReviewed(false);
        Article savedArticle = articleRepository.save(article);

        return articleMapper.toArticleResponse(savedArticle);
    }

    public ArticleListResponse findAllNotReviewed() {
        List<Article> articles = articleRepository.findByReviewedFalse();

        return articleMapper.toArticleListResponse(articles);
    }
}
