# Crypto Price Tracker

## API Integration Details

### How Data is Fetched
The app uses the CoinGecko API to fetch cryptocurrency data.

The API endpoint used is:
```
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1
```
This endpoint returns the top 100 cryptocurrencies by market cap.

### How Data is Updated
- Data is fetched when the app loads.
- Users can manually refresh the data by clicking the **Refresh** button.
- React Query handles caching and ensures data is fresh.

## State Management Explanation

### Why React Query?
React Query was chosen because:
- It simplifies data fetching and caching.
- It automatically handles loading and error states.
- It provides a `refetch` function for manual updates.
- Alternatives like Zustand or Context API would require more boilerplate code.

## Challenges & Solutions

### Challenge 1: API Rate Limits
- **Problem:** CoinGecko API has rate limits, and too many requests can cause errors.
- **Solution:** React Query's caching reduces the number of API calls. The app also allows manual refreshing instead of auto-refreshing.

### Challenge 2: Search Functionality
- **Problem:** Implementing a real-time search filter without making too many API calls.
- **Solution:** The search is done on the client side using JavaScript, filtering the already fetched data.

### Challenge 3: Responsive Design
- **Solution:** Tailwind CSS was used to create a responsive design that adapts to different screen sizes.
---

## Running and Testing the Documentation 

1. Start the wep-app server:
   ```bash
   npm run start
   ```
2. Visit [http://localhost:3000](http://localhost:3001) to see your documentation.

3. Start the Docusaurus server:
   ```bash
   npm run start
   ```
4. Visit [http://localhost:3001](http://localhost:3001) to see your documentation.


## What You’ll See 
A clean homepage with a welcome message.
A sidebar with a link to the Crypto Tracker Documentation.
A documentation page that includes:
- **Project Setup Guide:** How to run the web app.
- **API Integration Details:** How data is fetched and updated.
- **State Management Explanation:** Why React Query was chosen.
- **Challenges & Solutions:** Problems faced and how they were solved.
