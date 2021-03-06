import { useEffect, useState } from 'react'; 
import { useSelector } from "react-redux"; 
import io from 'socket.io-client';

const UseAllUserChats = () => { 
  const [allUnreadMessages, setAllUnreadMessages] = useState(0); 
  const [messageChatId, setMessageChatId] = useState(null);
  const [initState, setInitState] = useState(false); 
  const [socket, setSocket] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loadingUser } = userLogin;

  useEffect(() => {
    // Tämä ei välttämättä toimi kun vie tuontantoon
    const newSocket = io(`http://${window.location.hostname}:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const resetMessageCounter = () => {
    setAllUnreadMessages(0);
  };

  const addToUnredCounter = (numberToAdd, action) => {
    console.log('numberToAdd', numberToAdd, 'action', action)
    if (action === 'increment') {
      return setAllUnreadMessages(allUnreadMessages => allUnreadMessages + numberToAdd);
    }
    if (action === 'decrement' && allUnreadMessages > 0) {
      return setAllUnreadMessages(allUnreadMessages => allUnreadMessages - numberToAdd);
    }
  };

  useEffect(() => {
    if (socket) {
    const messageListener = (value) => {
        const { messages, chatId } = value;
        if (messages?.length > 0 && messages[messages.length - 1]?.createdBy !== userInfo?._id) {
          addToUnredCounter(1, 'increment');
          setMessageChatId(chatId);
        }
    };
  
    socket.on('message', messageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
    }
  }
  }, [socket]);

  useEffect(() => {
    if (userInfo?.unreadMessages > 0 && !initState) {
      setAllUnreadMessages(userInfo?.unreadMessages);
      setInitState(true);
    }
  }, [userInfo, userInfo?.unreadMessages, initState]);

  console.log('unreadedMessages', allUnreadMessages)

  return {    
    allUnreadMessages,
    addToUnredCounter,
    resetMessageCounter,
    socket,
    messageChatId,
    setMessageChatId,
  };
};
 
export default UseAllUserChats;
