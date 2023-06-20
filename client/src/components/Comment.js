import { usePost } from '../contexts/PostContext'
import { CommentButton } from './CommentButton'
import { CommentList } from './CommentList';
import { getTimeSince } from '../utils/date'
import { FaHeart, FaReply, FaTrash, FaEdit } from 'react-icons/fa'
import avatarSrc from '../assets/image-juliusomo.png';

export function Comment({ id, message, user, createdAt }) {

    const { getReplies } = usePost()
    const childComments = getReplies(id)
    const areChildrenHidden = false
    
    return <>
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
                    <CommentButton Icon={ FaReply } aria-label="Reply">Reply</CommentButton>
                    <CommentButton Icon={ FaTrash } aria-label="Delete" color="danger">Delete</CommentButton>
                    <CommentButton Icon={ FaEdit } aria-label="Edit">Edit</CommentButton>
                </div>
            </div>
            <p className='comment-message'>{ message }</p>
        </div>

        {childComments?.length > 0 && (
            <div className={`nested-comments-stack ${areChildrenHidden ? "hide" : ""}`}>
                <button className='collapse-line' area-label='Hide Replies' />
                <div className='nested-comments'>
                    <CommentList comments={childComments} />
                </div>
            </div>
        )}
    </>
}
