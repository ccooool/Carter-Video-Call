import React from "react";
import "../App.css";
import { Container, Row, Button, Col } from "react-bootstrap";

class VideoCall extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        remote
                        <video id="rVideo" autoPlay="autplay"></video>
                    </Col>
                    <Col>
                        local
                        <video id="lVideo" autoPlay="autplay" muted></video>
                    </Col>
                </Row>
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
            </Container>
        );
    }
}

export default VideoCall;
