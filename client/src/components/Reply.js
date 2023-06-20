import avatar from '../assets/image-juliusomo.png';

export default function ReplyBox({formData, updateFields, publishComment}) {
  return (
    <div className='container reply-container'> 
      <img className='user-avatar' src={avatar} />
      <form onSubmit={publishComment}>
        <textarea className='comment-input-box' value={formData} placeholder='Add a comment...' rows="3" maxlength='500' onChange={updateFields}></textarea>
        <button className='send-button' type='submit' >SEND</button>
      </form>
    </div>
  )
}