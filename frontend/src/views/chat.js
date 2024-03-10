import React, { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from 'emoji-picker-react';

// import 'emoji-mart/css/emoji-mart.css';


function Chat() {
  const [messages, setMessages] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
 
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  }

  return (
    <div>
      {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick}/>
    </div>
  );
}


export default Chat
