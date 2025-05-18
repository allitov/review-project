package ru.sibsutis.reviewproject.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import ru.sibsutis.reviewproject.dto.request.ArticleRequest;
import ru.sibsutis.reviewproject.dto.response.ArticleListResponse;
import ru.sibsutis.reviewproject.dto.response.ArticleResponse;
import ru.sibsutis.reviewproject.entity.Article;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ArticleMapper {

    @Mapping(target = "id", ignore = true)
    Article toArticleEntity(ArticleRequest article);

    @Mapping(target = "authorId", source = "author.id")
    ArticleResponse toArticleResponse(Article article);

    default ArticleListResponse toArticleListResponse(Iterable<Article> articles) {
        ArticleListResponse response = new ArticleListResponse();
        articles.forEach(article -> response.getArticles().add(toArticleResponse(article)));

        return response;
    }
}
