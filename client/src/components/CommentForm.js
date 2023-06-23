import { useState } from 'react'
import avatar from '../assets/image-juliusomo.png';

export function CommentForm({loading, error, onSubmit, autoFocus = false, initialValue = ""}) {
    const [message, setMessage] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(message).then(() => setMessage(initialValue))
    }

    return (  
        <form className='comment-form' onSubmit={handleSubmit}>
            <div className='comment-form-row'>
                <img className='user-avatar' src={avatar} />
                <textarea 
                    autoFocus={autoFocus}
                    className='comment-input' 
                    value={message} 
                    placeholder='Add a comment...' 
                    rows="3" 
                    maxLength='500' 
                    onChange={e => {setMessage(e.target.value)}}
                ></textarea>
                <button 
                    className='comment-button filled-button' 
                    type='submit'
                    disabled={loading}
                >
                    {loading ? "Loading" : "SEND"}
                </button>
            </div>
            <div className={`error-msg ${!error ? "hide" : ""}`}>{error}</div>
        </form>
    )
}