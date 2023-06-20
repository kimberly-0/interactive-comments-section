import { Comment } from './Comment'

export function CommentList({ comments }) {
    return (
        <div className='comment-list'>
            {comments.map(comment => {
                    return (
                        <div key={comment.id} className="comment-stack">
                            <Comment {...comment} />
                        </div>
                    )
            })}
        </div>
    )
}