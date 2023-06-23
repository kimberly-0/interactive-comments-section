export function useUser() {
    // console.log("cookie match: " + document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id)
    return { id: document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id }
}