import { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from "react-redux"; 
import { getUserChats } from '../../actions/chatActions';
import io from 'socket.io-client';

const UseAllUserChats = () => { 
  const [allUnreadMessages, setAllUnreadMessages] = useState(0); 
  const [initState, setInitState] = useState(false); 
  const [socket, setSocket] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loadingUser } = userLogin;

  const allChats = useSelector((state) => state.userChats);
  const { allUserChats, loading: loadingChats } = allChats;

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
    const messageListener = (messages) => {
        if (messages?.length > 0 && messages[messages.length - 1]?.createdBy !== userInfo?._id) {
          addToUnredCounter(1, 'increment');
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
    if (!allUserChats && userInfo) {
      dispatch(getUserChats());
    }
  }, [dispatch, allUserChats, userInfo]);

  // Lasketaan kaikki lukemattomat viestit kun kaikki chatit tulee 
  useEffect(() => {
    if (allUserChats && !loadingChats && !initState) {
      const unreadedMessages = allUserChats?.map((chat) => {
        if (chat?.messages?.length > 0) {
          chat.messages.forEach((message) => {
            if (message.receiverHasRead === false && message.createdBy !== userInfo._id) {
            console.log('messages', message, chat._id)
              setAllUnreadMessages(allUnreadMessages => allUnreadMessages + 1);
            }

          });
        }         
        return chat;
      });
      setInitState(true);
    }

  }, [allUserChats, loadingChats, loadingUser, userInfo?._id, initState]);
  console.log('unreadedMessages', allUnreadMessages)

return {    
    loadingChats,
    allUnreadMessages,
    addToUnredCounter,
    resetMessageCounter,
    socket,
}
}
 
export default UseAllUserChats;
