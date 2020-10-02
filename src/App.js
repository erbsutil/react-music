import React from 'react';
import './App.css';

const url_end = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term';

class App extends React.Component {
  constructor(props){
    super();
    this.parametros = this.getHashParams();
    this.token = this.parametros.access_token;
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount(){
    fetch(url_end, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
    .then(response => response.json())
  }
}

export default App;
