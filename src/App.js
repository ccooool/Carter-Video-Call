import React from "react";
import "./App.css";
import io from "socket.io-client";
import { Container, Row, Button, Col } from "react-bootstrap";
import MessageList from "./chat/MessageList";
import SendMessage from "./chat/SendMessage";
import VideoCall from "./video/VideoCall";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        
        this.socket = io(`ws://${window.location.host}`, {
            reconnection: false,
        });

        this.connectedPromise = new Promise((resolve) => {
            this.socket.on("connect", () => {
                console.log("Connected to server!");
                resolve();
            });
        });

        this.socket.on("userMessage", (data) => {
            this.setState({
                messages: [...this.state.messages, data],
            });
        });

        this.socket.on("messageList", (messageList) => {
            console.log(messageList);
            this.setState({
                messages: [...this.state.messages, ...messageList],
            });
        })
    }

    componentDidMount() {
        this.socket.emit("getMessages", {});
    }

    sendMessage = (user, message) => {
        this.socket.emit("userMessage", { user, message });
    }

    render() {
        return (
            <div>
                <h1 className="h3 title">Carter Video Chat</h1>
                <Container>
                    <Row>
                        <Col>
                            <MessageList
                                messages={this.state.messages}
                            />
                            <SendMessage sendMessage={this.sendMessage}/>
                        </Col>
                        <Col>
                            <VideoCall/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
