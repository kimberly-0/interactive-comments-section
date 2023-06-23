import React, { useContext, useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getPost } from '../services/posts'

const Context = React.createContext()

export function usePost() {
    return useContext(Context)
}

export function PostProvider({ children }) {
    const { id } = useParams()
    const { loading, error, value: post } = useAsync(() => getPost(id), [id])
    const [comments, setComments] = useState([])
    const commentsByParentId = useMemo(() => {
        if (comments == null) return []
        const group = {}
        comments.forEach(comment => {
            group[comment.parentId] ||= []
            group[comment.parentId].push(comment)
        })
        return group
    }, [comments])
    
    useEffect(() => {
        if (post?.comments == null) return
        setComments(post.comments)
    }, [post?.comments])

    function getReplies(parentId) {
        return commentsByParentId[parentId]
    }

    function createLocalComment(comment) {
        setComments(prevComments => {
            return [comment, ...prevComments]
        })
    }

    function deleteLocalComment(id) {
        setComments(prevComments => {
            return prevComments.filter(comment => comment.id !== id)
        })
    }

    return (
        <Context.Provider value={{
            post: { id, ...post },
            rootComments: commentsByParentId[null],
            getReplies,
            createLocalComment,
            deleteLocalComment
        }}>
            {loading ? (
                <h1>Loading</h1>
            ) : error ? (
                <h1 className="error-msg">{error}</h1>
            ) : (
                children
            )}
        </Context.Provider>
    )
}