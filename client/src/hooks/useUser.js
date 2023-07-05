import { makeRequest } from "../services/makeRequest";

// get userId of logged-in user through request since cookies are not supported for cross-domain deployment (in case of deployment of client and server on a single domain, use cookies by removing this code and uncommenting the return statement in useUser that uses cookies)
const userId = await makeRequest("/getUserId").then(userId => {
    return userId
}).catch(error => {
    console.log(error)
    return
})

export function useUser() {
    return { id: userId }

    // return { id: document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id }
}