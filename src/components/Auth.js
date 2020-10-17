import React from "react";
import "./Auth.css";
import Player from "./Player";

const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = "ffe68d14725c4dc5ae6b29eaf45791a0";
const redirectUri = "http://localhost:3000/react-music/";
const scopes = [
  "user-top-read"
];

const hash = window.location.hash

.substring(1)
.split("&")
.reduce(function(initial, item) {
  if (item) {
    var parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});

window.location.hash = "";

class Auth extends React.Component {
    constructor() {
        super();
        this.state = {
            token: null      
        };      
    }

    componentDidMount() {
        let _token = hash.access_token;
        if (_token) {
          this.setState({
            token: _token
          });
        }
    }

    render() {
        return (
          <div>
            {!this.state.token && (
              <div>
                <a
                  className="btn"
                  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                >
                  Login com Spotify
                </a>
                
                <br />
                <small>* Para visualizar uma de suas 50 músicas mais ouvidas nos últimos 6 meses.</small> 
              </div>
            )}
            
            {this.state.token && (
              <Player
                token = {this.state.token}
              />
            )}
          </div>
        )
    }
}

export default Auth;
