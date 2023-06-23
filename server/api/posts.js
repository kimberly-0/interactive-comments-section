const express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const app = require('../server');

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

postsRouter.get("/", async (req, res) => {
    const posts = await prisma.post.findMany({ 
        select: {
            id: true,
            title: true
        }
    })
    res.status(200).json(posts)
})

postsRouter.get("/:id", async (req, res) => {
    const post = await prisma.post.findUnique({ 
        where: {
            id: req.params.id
        },
        select: {
            body: true,
            title: true,
            comments: {
                orderBy: { 
                    createdAt: "asc"
                },
                select: COMMENT_SELECT_FIELDS
            }
        }
    })
    res.status(200).json(post)
})

postsRouter.post("/:id/comments", async (req, res) => {
    if (req.body.message === "" || req.body.message == null) {
        return res.send("Message is required");
        // return res.send(postsRouter.httpErrors.badRequest("Message is required"));
    }

    return await prisma.comment.create({
        data: {
            message: req.body.message,
            userId: req.cookies.userId,
            pqrentId: req.body.parentId,
            postId: req.params.id
        },
        select: COMMENT_SELECT_FIELDS
    }).then(comment => {
        return res.status(201).send({
            ...comment,
          likeCount: 0,
          likedByMe: false,
        })
    })
})

postsRouter.delete("/:postId/comments/:commentId", async (req, res) => {
  const { userId } = await prisma.comment.findUnique({
    where: { id: req.params.commentId },
    select: { userId: true },
  })
  if (userId !== req.cookies.userId) {
    return res.send(
      app.httpErrors.unauthorized(
        "You do not have permission to delete this message"
      )
    )
  }

  return await prisma.comment.delete({
        where: { id: req.params.commentId },
        select: { id: true },
    }).then(comment => {
        return res.status(202).send(comment)
    })
})

module.exports = postsRouter;
