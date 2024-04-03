
import './App.css'
import { useState, useEffect } from "react";
import { FormControl, InputGroup, Container, Button } from "react-bootstrap";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
const [searchInput, setSearchInput] = useState("");
const [accessToken, setAccessToken] = useState("");

useEffect(() => {
  let authParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret,
  };

  fetch("https://accounts.spotify.com/api/token", authParams)
    .then((result) => result.json())
    .then((data) => {
      setAccessToken(data.access_token);
    });
}, []);

async function search() {
  let artistParams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  // Get Artist
  const artistID = await fetch(
    "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
    artistParams
  )
    .then((result) => result.json())
    .then((data) => {
      return data.artists.items[0].id;
    });

    console.log("Id artista: " + artistID);
    console.log("Search input: " + searchInput);
}


  return (
    <>
      <h1>Pruebas API</h1>
      <Container>
        <InputGroup>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }} // search function
            onChange={(event) => setSearchInput(event.target.value)} // setSearch
            style={{
              width: "300px",
              height: "35px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
          />

          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>
    </>
  )
}

export default App

// A Container to wrap around the search box.
// An InputGroup used as the form for our search box.
// A FormControl for our search box input.
// A Button to search for what was typed.