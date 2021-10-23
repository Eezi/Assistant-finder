import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUserChats } from '../../actions/chatActions';

const UseAllUserChats = () => {
  const [allUnreadMessages, setAllUnreadMessages] = useState(0);
  const [unreadMessagesPerChat, setUnreadMessagesPerChat] = useState();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loadingUser } = userLogin;

  const allChats = useSelector((state) => state.userChats);
  const { allUserChats, loading: loadingChats } = allChats;

  useEffect(() => {
    if (!allUserChats) {
      dispatch(getUserChats());
    }
  }, [dispatch, allUserChats]);

  useEffect(() => {
    if (allUserChats && !loadingChats) {
      const unreadedMessages = allUserChats?.map((chat) => chat?.messages?.filter((message) => message.receiverHasRead === false && message.createdBy !== userInfo._id));
      if (unreadedMessages?.length > 0) {
        const counter = unreadedMessages?.map((messages) => setAllUnreadMessages(prevCount => prevCount + messages.length));
      }
    }

  }, [allUserChats, loadingChats])

return {    
    loadingChats,
    allUnreadMessages,
    unreadMessagesPerChat,
}
}
 

export default UseAllUserChats;