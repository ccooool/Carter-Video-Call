import React from "react";
import "../App.css";
import { Button } from "react-bootstrap";

class SendMessage extends React.Component {

    constructor(props) {
        super(props);
        this.form = {
            user: "",
            message: "",
        };
    }

    handleChange = (e) => {
        this.form[e.target.id] = e.target.value;
    };

    render() {
        return (
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
                <Button
                    type="primary"
                    id="button"
                    type="submit"
                    onClick={() => this.props.sendMessage(this.form.user, this.form.message)}
                >
                    Send
                </Button>
            </div>
        );
    }
}

export default SendMessage;
