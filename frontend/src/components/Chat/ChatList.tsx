import React, { FC, ReactElement } from 'react'
import { Button } from 'react-bootstrap'

const ChatList: FC<{}> = () => {

    return (
        <div>
            <Button>
            <i className="fas fa-plus mr-2"></i>    
             Lisää keskustelu
             </Button>
        </div>
    )

}

export default ChatList;