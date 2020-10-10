import React, { Component } from 'react';
import './App.css';
import { loadWeb3 } from '../services/web3Service';
import MemoryToken from '../artifacts/MemoryToken.json';

const CARD_ARRAY = [
  {
    name: 'fries',
    img: '/images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: '/images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: '/images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: '/images/pizza.png'
  },
  {
    name: 'milkshake',
    img: '/images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: '/images/hotdog.png'
  },
  {
    name: 'fries',
    img: '/images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: '/images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: '/images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: '/images/pizza.png'
  },
  {
    name: 'milkshake',
    img: '/images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: '/images/hotdog.png'
  }
]

class App extends Component {

  async componentWillMount() {
    await loadWeb3();
    await this.loadBlockchaninData();
  }

  async loadBlockchaninData() {
    try {
      const web3 = window.web3;
      const account = (await web3.eth.getAccounts())[0];
      this.setState({ account: account });

      // Load smart contract
      const networkId = await web3.eth.net.getId();
      const networkData = MemoryToken.networks[networkId];
      if(networkData) {
        const abi = MemoryToken.abi;
        const address = networkData.address;
        const token = new web3.eth.Contract(abi, address);
        this.setState({ token });
        const totalSupply = await token.methods.totalSupply().call();
        this.setState({ totalSupply });
        // Load Tokens
        let balanceOf = await token.methods.balanceOf(account).call();
        for (let i = 0; i < balanceOf; i++) {
          let id = await token.methods.tokenOfOwnerByIndex(account, i).call();
          let tokenURI = await token.methods.tokenURI(id).call();
          this.setState({
            tokenURIs: [...this.state.tokenURIs, tokenURI]
          })
        }
      } else {
        console.error('Smart contract not deployed to detected network.');
      }
    } catch (error) {
      console.error(error);    
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      token: null,
      totalSupply: 0,
      tokenURIs: [],
      cardArray: [],
      cardsChosen: [],
      cardsChosenId: [],
      cardsWon: []
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <p>Memory Tokens</p>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-muted"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1 className="d-4">Start matching now!</h1>
                <div className="grid mb-4" >
                  { this.state.cardArray.map((card, key) => {
                    return(
                      <img
                        alt={key}
                        key={key}
                        src={this.chooseImage(key)}
                        data-id={key}
                        onClick={(event) => {
                          let cardId = event.target.getAttribute('data-id')
                          if(!this.state.cardsWon.includes(cardId.toString())) {
                            this.flipCard(cardId)
                          }
                        }}
                      />
                    )
                  })}
                </div>
                <div>
                  <h5>Tokens Collected:<span id="result">&nbsp;{this.state.tokenURIs.length}</span></h5>
                  <div className="grid mb-4" >
                    { this.state.tokenURIs.map((tokenURI, key) => {
                      return(
                        <img
                          alt={key}
                          key={key}
                          src={tokenURI}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
