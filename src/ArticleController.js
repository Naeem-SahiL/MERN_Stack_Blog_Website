import mongoose from 'mongoose'
import { ArticlesSchema } from './ArticleModel';

const Article = mongoose.model('Article', ArticlesSchema);

export const addNewArticle = (req, res) => {
    let newArticle = new Article(req.body);
    newArticle.save((err, newArticle) => {
        if (err) {
            res.send(err);
        }
        res.json(newArticle);
    });
}

export const getArticles = (req, res) => {
    Article.find({}, (err, Articles) => {
        if (err) {
            res.send(err);
        }
        res.json(Articles);
    });
}

export const getArticleByName = (req, res) => {
    const articleName = req.params.name
    Article.findOne({ name: articleName }, (err, Article) => {
        if (err) {
            res.send(err);
        }
        res.json(Article);
    });
}

export const upvoteArticle = (req, res) => {
    const articleName = req.params.name;
    Article.findOneAndUpdate(
        { name: articleName },
        { "$inc": { upvotes: 1 } },
        { returnDocument: "after" },
        function (err, Article) {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).json(Article)
        }
    )
}

export const addCommentToArticle = (req, res) => {
    const { userName, text } = req.body;
    const articleName = req.params.name;
    Article.findOneAndUpdate(
        { name: articleName },
        {
            "$push":
                { comments: { userName, text } }
        },
        { returnDocument: "after" },
        function (err, Article) {
            if (err) {
                res.send(err)
            }
            res.status(200).json(Article)
        }
    );
}

export const getCommentsOfArticle = (req, res) => {
    const articleName = req.params.name;
    Article.findOne({ name: articleName }, (err, article) => {
        if (err) {
            res.status(500).json(err)
        }
        res.status(200).json(article.comments)
    });
}