import React from "react";
import "../App.css";
import { Container, Row, Button, Col } from "react-bootstrap";
import Peer from "peerjs";

function getLVideo(callbacks) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    var constraints = {
        audio: true,
        video: true
    }
    navigator.getUserMedia(constraints, callbacks.success, callbacks.error);
}

function recStream(stream, elemid) {
    var video = document.getElementById(elemid);
    video.srcObject = stream;
    window.peer_stream = stream;
}

class VideoCall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            connId: ""
        }
        // for now use the public servers
        // this.peer = new Peer();
        this.peer = new Peer({
            host: 'https://peerjs-server1234.herokuapp.com',
            port: 9000,
            path: '/myapp'
        });

        this.peer.on('open', (id) => {
            this.setState({ userId: id })
        });

        // when a client connects to another connected client
        this.peer.on('connection', (connection) => {
            this.conn = connection;
            this.setState({ connId: connection.peer });
        });

        this.peer.on('error', (err) => {
            alert("an error has happened:" + err);
        })

        this.peer.on('call', (call) => {
            var acceptCall = confirm("Do you want to answer this call?");
            if (acceptCall) {
                call.answer(window.localstream);
                call.on('stream', function (stream) {
                    window.peer_stream = stream;
                    recStream(stream, 'rVideo')
                });
                call.on('close', function () {
                    alert('The call has been denind');
                })
            } else {
                console.log("call denied")
            }
        });

    }

    componentWillMount() {
        getLVideo({
            success: function (stream) {
                window.localstream = stream;
                recStream(stream, 'lVideo');
            },
            error: function (err) {
                alert("do ya have a friggin camera");
                console.log(err);
            }
        })
    }

    handleChange = (e) => {
        this.state[e.target.id] = e.target.value;
    };

    connect = () => {
        if (this.state.connId) {
            this.conn = this.peer.connect(this.state.connId)
        } else {
            alert("enter an id");
            return false;
        }
    }

    call = () => {
        var call = this.peer.call(this.state.connId, window.localstream);

        call.on('stream', function (stream) {
            window.peer_stream = stream;
            recStream(stream, 'rVideo');
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    remote
                    <video id="rVideo" autoPlay="autplay"></video>
                </Row>
                <Row>
                    local
                    <video id="lVideo" autoPlay="autplay" muted></video>
                </Row>
                {this.state.userId}
                <input
                    type="text"
                    id="connId"
                    className="form-control"
                    placeholder="enter a connection id"
                    onChange={this.handleChange}
                    required
                />
                <Button onClick={() => this.connect()} variant="success" id="conn_button" type="submit">
                    Connect
                </Button>
                <Button onClick={() => this.call()} variant="danger" id="call_button" type="submit">
                    Call
                </Button>
            </Container>
        );
    }
}

export default VideoCall;
