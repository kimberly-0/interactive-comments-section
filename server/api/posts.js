const express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const postsRouter = express.Router();

const COMMENT_SELECT_FIELDS = {
    id: true,
    message: true,
    parentId: true,
    createdAt: true,
    user: {
        select: {
            id: true,
            name: true
        }
    }
}

postsRouter.param('postId', async (req, res, next, postId) => {
    await prisma.post.findUniqueOrThrow({ where: { id: postId } })
        .then(post => {
            req.post = post
            next()
            return
        })
        .catch(error => {
            console.log(error)            
            res.status(404).send("Post not found")
        })
});

postsRouter.get("/", async (req, res) => {
    return await prisma.post.findMany({ 
        select: {
            id: true,
            title: true
        }
    }).then(posts => {
        return res.status(200).json(posts)
    }).catch(error => {
        console.log(error)
        return res.status(400).send("Posts not found");
    })
})

postsRouter.get("/:postId", async (req, res) => {
    return await prisma.post.findUnique({ 
        where: {
            id: req.post.id
        },
        select: {
            body: true,
            title: true,
            comments: {
                orderBy: { 
                    createdAt: "asc"
                },
                select: {
                    ...COMMENT_SELECT_FIELDS,
                    _count: { select: { likes: true } }
                }
            }
        }
    }).then(async post => {
        const likes = await prisma.like.findMany({
            where: {
                userId: req.cookies.userId,
                commentId: { in: post.comments.map(comment => comment.id) }
            }
        })
        return res.status(200).json({
            ...post,
            comments: post.comments.map(comment => {
                const {_count, ... commentFields} = comment
                return {
                    ...commentFields,
                    likedByMe: likes.find(like => like.commentId === comment.id),
                    likeCount: _count.likes
                }
            })
        })
    }).catch(error => {
        console.log(error)
        return res.status(400).send("Post not found");
    })
})

module.exports = postsRouter;
