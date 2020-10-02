import React from 'react';
import './App.css';

const url_end = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term';
const random = Math.floor(Math.random() * 50);

class App extends React.Component {
  constructor(props){
    super();
    this.parametros = this.getHashParams();
    this.token = this.parametros.access_token;

    this.state = {
      item: "",
      url: ""
    };
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
    if (!this.token) {
      console.log("Você está deslogado")
    } else {
      fetch(url_end, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${this.token}`
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
  }

  render() {
    const { url } = this.state;

    return (
      <div className="App">
        {this.token 
          ? <p>Você está logado</p> 
          : <button><a href="http://localhost:8888">Logar com Spotify</a></button>
        }

        {this.state.item 
          ? <div>
              <p>Uma música que você gosta:</p>
              <iframe title="Spotify" src={url} width="300" height="380" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
          : <div>Sem dados sobre as músicas</div>
        }
      </div>
    );
  }
}

export default App;
