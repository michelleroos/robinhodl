import React, { useEffect, useState } from 'react';
import AssetDetail from './asset_detail';
import PortfolioChart from './portfolio_chart';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import News from '../news/news';
import PortfolioSidePanel from './portfolio_side_panel';
import Loader from '../loader/loader';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function portfolio() {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUserId);
  const currentPortfolioValue = useSelector((state) => state.entities.portfolioValue);
  const buyingPower = useSelector((state) => state.entities.buyingPower);
  const orders = useSelector((state) => state.entities.orders);
  const tokens = useSelector((state) => state.entities.tokenInfo.tokens);
  const tokensHeld = useSelector((state) => state.entities.tokensHeld);
  const [portfolio, setPortfolio] = useState([])
  const transfers = useSelector((state) => state.entities.transfers);
  
  useEffect(() => {
    document.title = ` Portfolio | Robinhodl `;
    dispatch(getUser(currentUser))
  }, [currentUser]);

  let arr = []
  tokensHeld.filter(token => token.number > 0).forEach((token, i) => {
    tokens.forEach(element => {
      if (token.token_sym === element.id) {
        arr.push({
          token_sym: token.token_sym,
          number: token.number,
          value: token.number * element.current_price,
          current_price: element.current_price,
          one_day_change: element.price_change_percentage_24h
        })
      }
    });
  })

  const updatePortfolio = () => {
    let tokenValue = 0;
    arr.forEach((token) => {
      tokenValue += (token.number * token.value);
    })
    dispatch(updatePortfolioValue({
      user_id: parseInt(currentUser.id) || parseInt(currentUser),
      amount: parseInt(buyingPower) + tokenValue
    }))
  }

  // setInterval(currentPortfolioValue, 1000 * 60 * 60 * 24);

  if (!buyingPower) {
    return (
      <Loader></Loader>
    )
  } else {
    return (
      <div id="portfolio-container">
        <div id="portfolio-content">
          <div id="feed-container">
            <div id="feed">
  
              <div id="header-container">
                <button onClick={updatePortfolio}>Update portfolio</button>
                <h1>{formatter.format(buyingPower)}</h1>
                <div id="change-container">
                  {/* <p id="change">+$215.48 (+1.65%)</p> */}
                  {/* <p id="period">Today</p> */}
                </div>
              </div>
  
              <div id="chart-container">
                <PortfolioChart
                  dispatch={dispatch}
                  currentUser={currentUser}
                  transfers={transfers} />
              </div>
  
              <Link to="/cash">
                <div id="buying-power-container">
                <p>Buying Power</p>
                <p>{formatter.format(buyingPower)}</p>
                </div>
              </Link>
  
              <News />
  
            </div>
  
            <PortfolioSidePanel tokensHeld={tokensHeld} arr={arr}/>
  
          </div>
        </div>
      </div>
    )
  }
};
