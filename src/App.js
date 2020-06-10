import React from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { Container, Row, Button, Col } from "react-bootstrap";

const socket = io(`ws://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise((resolve) => {
    socket.on("connect", () => {
        console.log("Connected to server!");
        resolve();
    });
});

class App extends React.Component {
    constructor(props) {
        super(props);
		this.state = {};
		this.myRef = React.createRef();
	}

	componentDidMount() {
		this.myRef.current.focus();
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
                                    type="text"
                                    id="handle"
                                    className="form-control"
                                    placeholder="name"
                                    required
                                    ref={this.myRef}
                                />
                                <input
                                    type="text"
                                    id="message"
                                    className="form-control"
                                    placeholder="enter a message"
                                    required
                                />
                                <button
                                    id="button"
                                    className="btn btn-lg btn-primary btn-block"
                                    type="submit"
                                >
                                    Send
                                </button>
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
                                <button
                                    id="conn_button"
                                    className="btn btn-lg btn-success btn-block"
                                    type="submit"
                                >
                                    Connect
                                </button>
                                <Button variant="danger"
                                    id="call_button"
                                    className="btn btn-lg btn-danger btn-block"
                                    type="submit"
                                >
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
