import {
    getArticles,
    addNewArticle,
    getArticleByName,
    upvoteArticle,
    getCommentsOfArticle,
    addCommentToArticle
} from './src/ArticleController'

export const routes = (app) => {
    app.route('/articles')
        .get(getArticles)
        .post(addNewArticle)

    app.route('/articles/:name')
        .get(getArticleByName)


    app.route('/articles/:name/upvote')
        .post(upvoteArticle)


    app.route('/articles/:name/comments')
        .get(getCommentsOfArticle)
        .post(addCommentToArticle)
}