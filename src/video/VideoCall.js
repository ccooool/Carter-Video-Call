import React from "react";
import "../App.css";
import { Button } from "react-bootstrap";

class VideoCall extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        remote
                        <video id="rVideo" autoPlay="autplay"></video>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        local
                        <video id="lVideo" autoPlay="autplay" muted></video>
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
        );
    }
}

export default VideoCall;
