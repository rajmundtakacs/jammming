# Jammming 

Jammming is a React application that lets you search for songs via the [Spotify Web API](https://developer.spotify.com/documentation/web-api/), create a custom playlist, and save it directly to your Spotify account.

---

## Tech Stack
- [React 18](https://react.dev/) with Create React App
- Spotify Web API (Implicit Authorization Flow)
- CSS Modules for styling

---

## Features
- **Spotify Authentication** – log in securely with your Spotify account  
- **Search** – find tracks by title or artist  
- **Playlist Builder** – add and remove tracks in a custom playlist  
- **Save to Spotify** – push your playlist to your Spotify profile with one click  

---

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/<your-username>/jammming.git
cd jammming
```

2. Install dependencies
```bash
npm install
```

3. Create an .env file in the project root with your Spotify app credentials:
```env
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_REDIRECT_URI=http://localhost:3000/
REACT_APP_SCOPES=playlist-modify-private playlist-modify-public user-read-private
```
!!! The REDIRECT_URI must exactly match one of the redirect URIs registered in your Spotify Developer Dashboard

4. Start the development server
```bash
npm start
```

The app will run at http://localhost:3000


## Deployment

Build a production bundle with:

```bash
npm run build
```

The build/ folder can be deployed to any static host (GitHub Pages, Netlify, Vercel, etc).

Don’t forget to add your deployed URL to the redirect URIs in the Spotify Dashboard!

## Project Structure

```text
src/
  components/      # Reusable UI components (SearchBar, SearchResults, Playlist, etc.)
  util/Spotify.js  # Spotify API & authentication logic
  App.js           # Main app component
  index.js         # App entry point
```

## Development Notes

The playlist save functionality requires a valid Spotify Premium account (API restriction for playback features).

Tokens from the implicit flow expire after a short time; you may need to log in again.

## License

This project is for learning purposes (based on Codecademy’s Jammming project).
Feel free to fork and adapt for your own use.
