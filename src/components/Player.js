import React from "react";

const songsEndpoint = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term'

const random = Math.floor(Math.random() * 50);

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      item: "",
      url: ""
    };

    this.getSong = this.getSong.bind(this);
  }

  componentDidMount(props) {
    let token = this.props.token;

    if (token) {
      this.getSong(token);
    }
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

  render() {
    return (
      <div>
        <iframe title="Spotify" src={this.state.url} width="300" height="380" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    )
  }
}

export default Player;
