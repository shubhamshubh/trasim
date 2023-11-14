
# TraSim   

A trading simulator which allows you to place real-time trades in US Stocks with dummy-money to practice your trading strategies without encurring actual losses.




## Deployment

Trasim has a frontend server which is written in angular, a backend server written using springboot framework and for database we are using MongoDB here.

To run the application you will need MongoDB and Mongosh installed on your device locally.

Once you have that, cd to frontend/trade_simulate and type the following command:

```bash
  npm install
```
'npm install' has to be done only once when you have cloned the repo.


```bash
  ng serve
```
(Whenever you need to start the frontend server)

To start the backend server you need to open the "trasim backend" folder into eclipse/intellij and run the trasim Application.java file as a Java application.
## Usage/Examples

The app will be hosted on localhost:4200. When you reach that, you will be prompted to a login/signup page. Sign up with your username and password. Onc eyou sign up you will reach the welcome page where you will see your balance as $10000 and Profit/Loss as $0.

To make a trade, go to the Trade Center from the welcome page and add stocks to your watchlist using the stock symbols.

Note: For now, only the stocks traded under NASDAQ are supported. I am working on to add support to other stocks as well.

Once you have added stocks to your watchlist you can place the trades by clicking on buy/sell button next to the listed stock.

When you click on a stock, it's recent price history will appear as a graph on the right side of the watchlist for you to analyze the trend.

After the orders are placed, you will see a confirmation message (error message in case the order was invalid) on the screen. Head over to the positions page to analyze your profits/losses per stock basis.

