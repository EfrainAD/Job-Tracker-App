import './messageBox.scss'

const MessageBox = ({ message }) => {
   return (
      <div className="container">
         <div className="message-box">{message}</div>
      </div>
   )
}

export default MessageBox
