import { usePost } from '../contexts/PostContext'
import { CommentList } from './CommentList'

export function Post() {
    const { post, rootComments } = usePost()

    return (
        <div className='post'>
            <h1>{post.title}</h1>
            <article>{post.body}</article>
            <h3 className="comments-title">Comments</h3>
            <section>
                {rootComments != null && rootComments.length > 0 && (
                    <CommentList comments={rootComments} />
                )}
            </section>
        </div>
    )
}