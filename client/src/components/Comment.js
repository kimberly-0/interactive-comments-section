import { useState } from 'react'
import { usePost } from '../contexts/PostContext'
import { CommentButton } from './CommentButton'
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm'
import { getTimeSince } from '../utils/date'
import { FaHeart, FaReply, FaTrash, FaEdit } from 'react-icons/fa'
import avatarSrc from '../assets/image-juliusomo.png';
import { useAsyncFn } from "../hooks/useAsync"
import { useUser } from '../hooks/useUser'
import { createComment, updateComment, deleteComment } from "../services/comments"

export function Comment({ id, message, user, createdAt }) {

    const [areChildrenHidden, setAreChildrenHidden] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const { post, getReplies, createLocalComment, updateLocalComment, deleteLocalComment } = usePost()

    const createCommentFn = useAsyncFn(createComment)
    const updateCommentFn = useAsyncFn(updateComment)
    const deleteCommentFn = useAsyncFn(deleteComment)

    const childComments = getReplies(id)

    const currentUser = useUser()

    function onCommentReply(message) {
        return createCommentFn
            .execute({ postId: post.id, message, parentId: id })
            .then(comment => {
                setIsReplying(false)
                createLocalComment(comment)
            })
            .catch(error => {
                console.log("Caught an error: " + error)
            })
    }

    function onCommentUpdate(message) {
        return updateCommentFn
            .execute({ postId: post.id, message, id})
            .then(comment => {
                setIsEditing(false)
                updateLocalComment(id, comment.message)
            })
            .catch(error => {
                console.log("Caught an error: " + error)
            })
    }

    function onCommentDelete() {
        return deleteCommentFn
            .execute({ postId: post.id, id })
            .then(comment => deleteLocalComment(comment.id))
            .catch(error => {
                console.log("Caught an error: " + error)
            })
    }
    
    return (
        <>
            <div className='comment'> 
                <div className='comment-header'>
                    <div className='comment-info'>
                        <img className='user-avatar' src={avatarSrc} alt='user avatar' />
                        <h5 className='user-name'>{user.name}</h5>
                        {user.id === currentUser.id && (
                            <p className='user-label'>you</p>
                        )}
                        <p className='time-since'>{getTimeSince(createdAt)}</p>
                    </div>
                    <div className='comment-actions'>
                        <CommentButton 
                            Icon={FaHeart} 
                            aria-label="Like"
                        >2</CommentButton>
                        <CommentButton 
                            onClick={() => setIsReplying(prev => !prev)}
                            isActive={isReplying}
                            Icon={FaReply} 
                            aria-label={isReplying ? "Cancel Reply" : "Reply"} 
                        />
                        {user.id === currentUser.id && (<>
                            <CommentButton 
                                onClick={() => setIsEditing(prev => !prev)}
                                Icon={FaEdit} 
                                aria-label={isEditing ? "Cancel Edit" : "Edit"}  
                            />
                            <CommentButton 
                                disabled={deleteCommentFn.loading}
                                onClick={onCommentDelete}
                                Icon={FaTrash} 
                                aria-label="Delete" 
                                color="danger" 
                            />
                        </>)}
                    </div>
                    
                </div>

                {isEditing ? (
                    <CommentForm 
                        autoFocus 
                        initialValue={message} 
                        onSubmit={onCommentUpdate} 
                        loading={updateCommentFn.loading} 
                        error={updateCommentFn.error}
                        showAvatar={!isEditing}
                    /> 
                ) : (
                    <p className='comment-message'>{message}</p>
                )}

                {deleteCommentFn.error && (
                    <div className="error-msg">{deleteCommentFn.error}</div>
                )}
            </div>

            {childComments?.length > 0 && (
                <>
                    <div className={`nested-comments-stack ${areChildrenHidden ? "hide" : ""}`}>
                        <button 
                            className='collapse-line' 
                            area-label='Hide Replies' 
                            onClick={() => setAreChildrenHidden(true)}
                        />
                        <div className='nested-comments'>
                            <CommentList comments={childComments} />
                        </div>
                    </div>
                    <button 
                        className={`show-replies-button filled-button ${!areChildrenHidden ? "hide" : ""}`} 
                        onClick={() => setAreChildrenHidden(false)}
                    >Show Replies</button>
                </>
            )}

            {isReplying && (
                <div>
                    <CommentForm 
                        autoFocus 
                        onSubmit={onCommentReply}
                        loading={createCommentFn.loading}
                        error={createCommentFn.error}
                    />
                </div>
            )}
        </>
    )
}
