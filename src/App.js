import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('')


   useEffect(() => {
  axios.get(
'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
)
.then(res => {
   setCoins(res.data);
}).catch(error => console.log(error))
}, []);

const handleChange = e => {
  setSearch(e.target.value)
}

const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(search.toLowerCase()))
  

  return (
    
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Pra você</h1> {/*titulo caixa de pergunta*/}
        <form>
          <input type="text" placeholder="Digitar" className="coin-input" onChange={handleChange}/> {/*Caixa de digitar*/}
        </form>
      </div>
      
      {filteredCoins.map(coin => { //Pegando informações do link a cima, renderizando no site
        return <Coin key={coin.id} name={coin.name} image={coin.image}
                symbol={coin.symbol} marketcap={coin.market_cap} volume={coin.market_cap}
                 price={coin.current_price} priceChange={coin.price_change_percentage_24h}
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                 marketcap={coin.total_volume}
                 //esta exportando para coin, onde esta configurando e renderizando
     />

         

      })}
    </div>
  );
}

export default App;
