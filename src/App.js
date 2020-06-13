import React from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { Container, Row, Button, Col } from "react-bootstrap";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.form = {
            user: "",
            message: ""
        }
        this.socket = io(`ws://${window.location.host}`, { reconnection: false });

        this.connectedPromise = new Promise((resolve) => {
            this.socket.on("connect", () => {
                console.log("Connected to server!");
                resolve();
            });
        });
	}
    
    handleChange = e => {
        this.form[e.target.id] = e.target.value;
    }

    sendMessage() {
        this.socket.emit('userMessage', {
            user: this.form.user,
            message: this.form.message
        })
    }

    render() {
        return (
            <div>
                <h1 className="h3">Carter Video Chat</h1>
                <Container>
                    <Row>
                        <Col>
                            <div id="chat-window">
                                <div id="output" />
                                <div id="typing" />
                            </div>
                            <div className="container">
                                <input
                                    onChange={this.handleChange}
                                    type="text"
                                    id="user"
                                    className="form-control"
                                    placeholder="name"
                                    required
                                />
                                <input
                                    onChange={this.handleChange}
                                    type="text"
                                    id="message"
                                    className="form-control"
                                    placeholder="enter a message"
                                    required
                                />
                                <Button type="primary" id="button" type="submit" onClick={() => this.sendMessage()}>
                                    Send
                                </Button>
                            </div>
                        </Col>
                        <Col>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                        remote
                                        <video
                                            id="rVideo"
                                            autoPlay="autplay"
                                        ></video>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                        local
                                        <video
                                            id="lVideo"
                                            autoPlay="autplay"
                                            muted
                                        ></video>
                                    </div>
                                </div>
                                <span id="displayId" />
                                <input
                                    type="text"
                                    id="connId"
                                    className="form-control"
                                    placeholder="enter a connection id"
                                    required
                                />
                                <Button variant="success" id="conn_button" type="submit">
                                    Connect
                                </Button>
                                <Button variant="danger" id="call_button" type="submit">
                                    Call
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
