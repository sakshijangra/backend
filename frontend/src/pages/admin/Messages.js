import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/message/getall`);
      if (data.success) {
        setMessages(data.messages);
        if (data.messages.length > 0) {
          setSelectedMessage(data.messages[0]);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1>Messages</h1>
      </div>
      
      {loading ? (
        <div className="loading">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="no-data">No messages found</div>
      ) : (
        <div className="messages-container">
          <div className="messages-list">
            {messages.map((message) => (
              <div 
                key={message._id} 
                className={`message-item ${selectedMessage?._id === message._id ? 'active' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="message-sender-avatar">
                  {message.firstName.charAt(0)}{message.lastName.charAt(0)}
                </div>
                <div className="message-preview">
                  <h4>{message.firstName} {message.lastName}</h4>
                  <p>{message.message.substring(0, 50)}...</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="message-detail">
            {selectedMessage ? (
              <>
                <div className="message-header">
                  <div className="sender-info">
                    <div className