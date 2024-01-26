import React, { useState, useEffect } from 'react';
import '../newsfeed.css';

const Reactions = ({ reactions }) => (
  <div className="reactions">
    {reactions.map((reaction, index) => (
      <span key={index}>{reaction.emoji} by {reaction.username}</span>
    ))}
  </div>
);

const NewsFeed = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://845d97vw4k.execute-api.eu-central-1.amazonaws.com/getAllPosts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        console.log(data);

        if (data.status === 'ok') {
          setUserData(data);
          setMessages(data.posts); // Speichere die empfangenen Nachrichten
        } else {
          console.error('Fehler beim Abrufen der Nutzerdaten', data);
        }
      } catch (error) {
        console.error('Fehler beim Netzwerkaufruf', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); 

  const handleSendMessage = async () => {
    try {
      const response = await fetch('https://845d97vw4k.execute-api.eu-central-1.amazonaws.com/addPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("UserID"),
          content: newMessage,
          media_link: uploadedImage,
        }),
      });

      const data = await response.json();

      console.log('Data:', data);
      window.location.reload(true);
     

    } catch (error) {
      console.error('Fehler beim Netzwerkaufruf', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  }; 

  return (
    <div className="app">
      <img src="https://cdn.discordapp.com/attachments/1195301143161606205/1195301598507827240/techst_logo_rz_white.png?ex=65b37e5c&is=65a1095c&hm=951cba6cabd865ab2f4e7c4fd8e295c18bb4f3b9a3474d434849184a84fcbd48&" alt="Logo" className="logo" />
      <div className="chat">
        <div className="messages">
          {isLoading ? (
            <p>Lädt Nachrichten...</p>
          ) : (
            messages.slice(-1000).map((message, index) => (
              <div className="message" key={index}>
               
                <p>{message.content}</p>
                <img src={message.MediaLink}  width='600px'/>

              </div>
            ))
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="upload-button">Upload Image</label>
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
