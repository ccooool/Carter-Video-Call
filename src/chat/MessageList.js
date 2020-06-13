import React from "react";
import "../App.css";

class MessageList extends React.Component {
    render() {
        return (
            <div className="chat-window">
                <ul className="message-list">
                    {this.props.messages.map((obj, index) => {
                        return (
                            <li key={index} className="message">
                                <div>{obj.user}</div>
                                <div>{obj.message}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default MessageList;