import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Records from './records/Records.js';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { GridList, GridTile } from 'material-ui/GridList';

import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const defaultUrl = "ws://192.168.1.71/t/sim/front/mobile";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: defaultUrl,
            ws: null, //new WebSocket('ws://192.168.1.71/t/sim/front/mobile'),
            status: "Please connect to server",
            history: [],
            request: {
                "aid": "peek_message"
            },
            data:{},
            attempts: 1
        };
        this.changeUrl = this
            .changeUrl
            .bind(this);
        this.changeRequest = this
            .changeRequest
            .bind(this);
    }

    sendMessage() {
        let obj = this.state.request;
        this
            .state
            .ws
            .send(JSON.stringify(obj));
        let his = this.state.history;
        his.push({
            "dir": "send",
            "time": new Date(),
            "data": obj
        });
        this.setState({
            history: his
        });
    }

    initWebsocket() {
        this.state.ws = new WebSocket(this.state.url);
        this.setupWebsocket();
    }

    setupWebsocket() {
        let websocket = this.state.ws;

        websocket.onopen = () => {
            this.setState({
                status: 'Websocket connected'
            });
        };

        websocket.onmessage = (evt) => {
            
            let his = this.state.history;
            his.push({
                "dir": "receive",
                "time": new Date(),
                "data": evt.data
            });
            this.setState({
                history: his,
                data: evt.data
            });

        };

        this.shouldReconnect = this.props.reconnect;
        websocket.onclose = () => {
            this.setState({
                status: 'Websocket disconnected'
            });
            if (this.shouldReconnect) {
                let time = this.generateInterval(this.state.attempts);
                setTimeout(() => {
                    this.setState({
                        attempts: this.state.attempts++
                    });
                    this.setupWebsocket();
                }, time);
            }
        }
    }

    changeUrl(event) {
        console.log(event.target.value);
        this.setState({
            url: event.target.value
        });
    }

    changeRequest(event) {
        console.log(event.target.value);
        this.setState({
            request: JSON.parse(event.target.value)
        });
    }

    componentDidMount() {
        //   this.setupWebsocket();
    }

    componentWillUnmount() {
        this.shouldReconnect = false;
        let websocket = this.state.ws;
        websocket.close();
    }

    render() {
        const quotes = {"aid": "subscribe_quote","ins_list": "cu1705,rb1705"};
        const urlWarpper = {
            backgroundColor: "#fff",
            padding: "0px 20px",
        };
        const style = {
            margin: "10px",
        };
        const requestContainerStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            margin: '10px',
            padding: '10px',
            border: '1px solid #999'
        }

        return (
            <div className="App">
              <AppBar title={ this.state.status } showMenuIconButton={ false }
                iconElementRight={<RaisedButton label="HTTP Login" />}>
              </AppBar>
              <div>
                  <pre>{JSON.stringify(this.state.data, null, 4)}</pre>
            </div>
              <Toolbar style={ urlWarpper } noGutter={ true }>
                <ToolbarGroup style={ { 'width': '80%' } }>
                  <TextField defaultValue={ defaultUrl } floatingLabelText="Input websocket url" fullWidth={ true } onChange={ this.changeUrl } />
                </ToolbarGroup>
                <ToolbarGroup style={ { 'width': '20%' } }>
                  <RaisedButton onClick={ () => this.initWebsocket() } label="Connect" primary={ true } style={ style } fullWidth={ true } />
                </ToolbarGroup>
              </Toolbar>
              <br/>
              <div className="requestContainer" style={ requestContainerStyle }>
                <TextField id='requestContent' multiLine={ true } defaultValue={ JSON.stringify(this.state.request) } rows={ 10 } floatingLabelText="Requst content" fullWidth={ true }
                  onChange={ this.changeRequest } />
                <RaisedButton onClick={ () => this.sendMessage() } label="Send" primary={ true } style={ style } fullWidth={ true } />
              </div>
              <br/>
              <div className="requestContainer" style={ requestContainerStyle }>
                <Records content={this.state.history}/>
              </div>
            </div>
            );
    }
}
export default App;