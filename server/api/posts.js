const express = require('express');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const postsRouter = express.Router();

postsRouter.get("/", async (req, res) => {
    const posts = await prisma.post.findMany({ 
        select: {
            id: true,
            title: true
        }
    })

    res.json(posts)
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
                    createdAt: "desc"
                },
                select: {
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
            }
        }
    })
    console.log(JSON.stringify(post));

    res.json(post)
})

module.exports = postsRouter;
