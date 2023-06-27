import { usePost } from '../contexts/PostContext'
import { useAsyncFn } from '../hooks/useAsync'
import { createComment } from '../services/comments'
import { CommentList } from './CommentList'
import { CommentForm } from './CommentForm'

export function Post() {
    const { post, rootComments, createLocalComment } = usePost()
    const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)

    function onCommentCreate(message) {
        return createCommentFn({ postId: post.id, message }).then(
            createLocalComment
        ).catch(error => {
            console.log("Caught an error: " + error)
        })
    }

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
            <CommentForm 
                loading={loading} 
                error={error} 
                onSubmit={onCommentCreate} 
            />
        </div>
    )
}