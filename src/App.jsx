import './App.css'
import { useState, useEffect } from "react";
import { FormControl, InputGroup, Container, Button, Row, Card} from "react-bootstrap";

//? Se recupera de las variables de entorno el client_id y el client_secret
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  //? Estados: Se definen tres estados usando useState
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  //? useEffect: Autentificar y obtener el token de acceso, cada vez que el componente se monta. (porque como dependencia le paso un array vacío). Seteo el accesToken.
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

  //? Función search: Función asíncrona que busca al primer artista que tenga como resultado, y con su id, sus albumes con otro endpoint.
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

    //? Albums
    await fetch(
      "https://api.spotify.com/v1/artists/" +
      artistID +
      "/albums?include_groups=album&market=US&limit=50",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        console.log(data.items);
        setAlbums(data.items);
      });
  }
  return (
    <>
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
            }}
            onChange={(event) => setSearchInput(event.target.value)}
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
          <Button onClick={search} variant='primary'>Search</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          {/* Mapear el state albums */}
          {albums.map((album) => {
            return (
              <Card
                key={album.id}
                style={{
                  backgroundColor: "white",
                  margin: "10px",
                  borderRadius: "5px",
                  marginBottom: "30px",
                }}
              >
                <Card.Img
                  width={200}
                  src={album.images[0].url}
                  style={{
                    borderRadius: "4%",
                  }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      whiteSpace: "wrap",
                      fontWeight: "bold",
                      maxWidth: "200px",
                      fontSize: "18px",
                      marginTop: "10px",
                      color: "black",
                    }}
                  >
                    {album.name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      color: "black",
                    }}
                  >
                    Release Date: <br /> {album.release_date}
                  </Card.Text>
                  <Button
                    href={album.external_urls.spotify}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "15px",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    Album Link
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default App;

