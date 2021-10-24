import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUserChats } from '../../actions/chatActions';

const UseAllUserChats = () => {
  const [allUnreadMessages, setAllUnreadMessages] = useState(0);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loadingUser } = userLogin;

  const allChats = useSelector((state) => state.userChats);
  const { allUserChats, loading: loadingChats } = allChats;

  const resetMessageCounter = () => {
      setAllUnreadMessages(0);
  };

  useEffect(() => {
    if (!allUserChats && userInfo) {
      dispatch(getUserChats());
    }
  }, [dispatch, allUserChats, userInfo]);

  useEffect(() => {
    if (allUserChats && !loadingChats) {
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

  }, [allUserChats, loadingChats, loadingUser]);

return {    
    loadingChats,
    allUnreadMessages,
    resetMessageCounter,
}
}
 

export default UseAllUserChats;
