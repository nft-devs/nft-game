import React, { Component } from 'react';
import './App.css';
import { loadWeb3 } from '../services/web3Service';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  async componentWillMount() {
    await loadWeb3();
    await this.loadBlockchaninData();
  }

  async loadBlockchaninData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">NFT Memory Game</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default App;
