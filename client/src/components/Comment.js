import { useState } from 'react'
import { usePost } from '../contexts/PostContext'
import { CommentButton } from './CommentButton'
import { CommentList } from './CommentList';
import { getTimeSince } from '../utils/date'
import { FaHeart, FaReply, FaTrash, FaEdit } from 'react-icons/fa'
import avatarSrc from '../assets/image-juliusomo.png';
import { useAsyncFn } from "../hooks/useAsync"
import { deleteComment } from "../services/comments"

export function Comment({ id, message, user, createdAt }) {

    const [areChildrenHidden, setAreChildrenHidden] = useState(false)
    const { post, getReplies, deleteLocalComment } = usePost()
    const childComments = getReplies(id)

    const deleteCommentFn = useAsyncFn(deleteComment)

    function onCommentDelete() {
        return deleteCommentFn
            .execute({ postId: post.id, id })
            .then(comment => deleteLocalComment(comment.id))
    }
    
    return (
        <>
            <div className='comment'> 
                <div className='comment-header'>
                    <div className='comment-info'>
                        <img className='user-avatar' src={ avatarSrc } />
                        <h5 className='user-name'>{ user.name }</h5>
                        <p className='user-label'>you</p>
                        <p className='time-since'>{ getTimeSince(createdAt) }</p>
                    </div>
                    <div className='comment-actions'>
                        <CommentButton Icon={ FaHeart } aria-label="Like">2</CommentButton>
                        <CommentButton Icon={ FaReply } aria-label="Reply" />
                        <CommentButton 
                            disabled={deleteCommentFn.loading}
                            onClick={onCommentDelete}
                            Icon={ FaTrash } 
                            aria-label="Delete" 
                            color="danger" />
                        <CommentButton Icon={ FaEdit } aria-label="Edit" />
                    </div>
                </div>
                <p className='comment-message'>{ message }</p>
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
        </>
    )
}
