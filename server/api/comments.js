const express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const app = require('../server');

const commentsRouter = express.Router({ mergeParams: true });

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

commentsRouter.param('commentId', async (req, res, next, commentId) => {
    await prisma.comment.findUniqueOrThrow({ where: { id: commentId } })
        .then(comment => {
            req.comment = comment
            next()
            return
        })
        .catch(error => {
            console.log(error)
            return res.status(404).send("Comment not found")
        })
});

commentsRouter.post("/", async (req, res) => {
    if (req.body.message === "" || req.body.message == null) {
        return res.status(400).send("Message is required");
    }

    return await prisma.comment.create({
        data: {
            message: req.body.message,
            userId: req.cookies.userId,
            parentId: req.body.parentId,
            postId: req.post.id,
        },
        select: COMMENT_SELECT_FIELDS
    }).then(comment => {
        return res.status(201).send({
            ...comment,
          likeCount: 0,
          likedByMe: false,
        })
    }).catch(error => {
        console.log(error)
        return res.status(400).send("Unable to create comment");
    })
})

commentsRouter.put("/:commentId", async (req, res) => {
    if (req.body.message === "" || req.body.message == null) {
        return res.status(400).send("Message is required");
    }

    if (req.comment.userId !== req.cookies.userId) {
        return res.status(401).send("You do not have permission to edit this message");
    }

    return await prisma.comment.update({
        where: { id: req.comment.id },
        data: { message: req.body.message },
        select: { message: true }
    }).then(comment => {
        return res.status(201).send(comment)
    }).catch(error => {
        console.log(error)
        return res.status(400).send("Unable to update comment");
    })
})

commentsRouter.delete("/:commentId", async (req, res) => {
    if (req.comment.userId !== req.cookies.userId) {
        return res.status(401).send("You do not have permission to delete this message");
    }

    return await prisma.comment.delete({
        where: { id: req.comment.id },
        select: { id: true },
    }).then(comment => {
        return res.status(202).send(comment)
    }).catch(error => {
        console.log(error)
        return res.status(400).send("Unable to delete comment");
    })
})

module.exports = commentsRouter;