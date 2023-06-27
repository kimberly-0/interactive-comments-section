const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function onRequestHook (req, res, next) {
    // Change name to log in as a different person: 'juliusomo', 'maxblagun', 'ramsesmiron', or 'amyrobson'
    const CURRENT_USER_ID = (
        await prisma.user.findFirst({ where: { name: "juliusomo" } }).then(user => {
            return user.id
        }).catch(error => {
            console.log(error)
            return
        })
    ) 
    // || "2d613bd5-413a-439a-bd1f-b40681f0980f" // juliusomo

    if (req.cookies.userId !== CURRENT_USER_ID) {
        req.cookies.userId = CURRENT_USER_ID
        res.clearCookie("userId")
        res.cookie("userId", CURRENT_USER_ID)
    }
    
    // console.log("req.cookies.userId : " + req.cookies.userId)
    // console.log("req.signedCookies : " + req.signedCookies.userId)

    next()
}

module.exports = onRequestHook;