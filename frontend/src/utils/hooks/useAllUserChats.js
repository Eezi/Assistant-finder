import { useEffect, useState } from 'react'; 
import { useLocation } from 'react-router-dom' 
import { useSelector, useDispatch } from "react-redux"; 
import { getUserChats } from '../../actions/chatActions';

const UseAllUserChats = () => { 
  const [allUnreadMessages, setAllUnreadMessages] = useState(0); 

  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loadingUser } = userLogin;

  const allChats = useSelector((state) => state.userChats);
  const { allUserChats, loading: loadingChats } = allChats;

  const rightPathname = location.pathname.split('/')[1];
  const chatId = location.pathname.split('/')[2];

  const resetMessageCounter = () => {
    setAllUnreadMessages(0);
  };

  const addToUnredCounter = (numberToAdd) => {
    console.log('Lisätään luku', numberToAdd)
    setAllUnreadMessages(allUnreadMessages => allUnreadMessages + numberToAdd);
  };
    console.log('Kaikki vietit päivittyy ', allUnreadMessages)

  useEffect(() => {
    if (allUserChats && rightPathname === 'chats' && allUnreadMessages > 0) {
      const currentChat = allUserChats.find((chat) => chat._id === chatId);
      const unreadMessagesCount = currentChat?.messages?.filter((message) => message.receiverHasRead === false && message.createdBy !== userInfo._id)?.length || 0;
      setAllUnreadMessages(messages => messages - unreadMessagesCount);
    }
  }, [chatId, allUserChats]);

  useEffect(() => {
    if (!allUserChats && userInfo) {
      dispatch(getUserChats());
    }
  }, [dispatch, allUserChats, userInfo]);

  // Haetaan kaikki lukemattomat viestit kun kaikki chatit tulee 
  useEffect(() => {
    if (allUserChats && !loadingChats) {
      console.log('RENDAA KAIKKI LUVUT')
      const unreadedMessages = allUserChats?.map((chat) => {
        if (chat?.messages?.length > 0) {
          chat.messages.forEach((message) => {
            if (message.receiverHasRead === false && message.createdBy !== userInfo._id) {
              setAllUnreadMessages(allUnreadMessages => allUnreadMessages + 1);
            }

          });
        }         
        return chat;
      })
    }

  }, [allUserChats, loadingChats, loadingUser, userInfo._id]);

return {    
    loadingChats,
    allUnreadMessages,
    addToUnredCounter,
    resetMessageCounter,
}
}
 

export default UseAllUserChats;
