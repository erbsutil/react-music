import React, { Component } from "react";
import "./App.css";
export const authEndpoint = 'https://accounts.spotify.com/authorize';
export const songsEndpoint = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term'

const random = Math.floor(Math.random() * 50);

const clientId = "ffe68d14725c4dc5ae6b29eaf45791a0";
const redirectUri = "http://erbsutil.github.io/react-music/";
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: "",
      url: ""
    };

    this.getSong = this.getSong.bind(this);
  }

  getSong(token) {
    fetch(songsEndpoint, {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(data => 
      this.setState({ 
        item: data.items[random].id,
        url: `https://open.spotify.com/embed/track/${data.items[random].id}`,
      })
    );
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      this.getSong(_token);
    }
  }

  render() {
    return (
      <div className="App">
        {!this.state.token && (
          <div>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            >
              Login com Spotify
            </a>
            
            <br />
            <small>* Para visualizar uma de suas 50 músicas mais ouvidas nos últimos 6 meses.</small> 
          </div>
        )}
        
        {this.state.token && (
          <iframe title="Spotify" src={this.state.url} width="300" height="380" allowtransparency="true" allow="encrypted-media"></iframe>
        )}
      </div>
    );
  }
}

export default App;
