const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    /*
    Create users
    */
    const amyrobson = await prisma.user.create({ data: { name: 'amyrobson' } })
    const maxblagun = await prisma.user.create({ data: { name: 'maxblagun' } })
    const ramsesmiron = await prisma.user.create({ data: { name: 'ramsesmiron' } })
    const juliusomo = await prisma.user.create({ data: { name: 'juliusomo' } })

    /*
    Create posts
    */
    const post1 = await prisma.post.create({
        data: {
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis dapibus urna, vel cursus erat. Curabitur laoreet nisl felis. Proin arcu turpis, dictum ac blandit ut, posuere eu dui. Donec congue imperdiet faucibus. Donec nec felis id erat feugiat scelerisque. Cras hendrerit lacinia magna et condimentum. Integer ipsum eros, rutrum id mi eget, consectetur placerat turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet ligula ac fermentum egestas. Vivamus eu convallis lectus. Donec lobortis mattis purus, at placerat mi tristique faucibus. Maecenas auctor molestie nunc blandit iaculis.",
            title: "New project",
        },
    })

    /*
    Create comments
    */
    const comment1 = await prisma.comment.create({
        data: {
            message: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            userId: amyrobson.id,
            postId: post1.id,
        },
    })

    const comment2 = await prisma.comment.create({
        data: {
            message: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            userId: maxblagun.id,
            postId: post1.id,
        },
    })

    const comment3 = await prisma.comment.create({
        data: {
            parentId: comment2.id,
            message: "If you're still new. I'd recomment focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            userId: ramsesmiron.id,
            postId: post1.id,
        },
    })

    const comment4 = await prisma.comment.create({
        data: {
            parentId: comment3.id,
            message: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            userId: juliusomo.id,
            postId: post1.id,
        },
    })
}

seed().then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})