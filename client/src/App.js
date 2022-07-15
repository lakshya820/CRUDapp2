import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [dor, setDor] = useState("");

  const [newArtist, setNewArtist] = useState("");

  const [songsList, setSongsList] = useState([]);

  const addSongs = () => {
    Axios.post("http://localhost:3000/create", {
      name: name,
      artist: artist,
      dor: dor,
    }).then(() => {
      console.log("success");
      
      });
    };
  

  const getSongs = () => {
    Axios.get("http://localhost:3000/songs").then((response) => {
      setSongsList(response.data);
    });
  };

  const updateSongsArtist = (id) => {
    Axios.put("http://localhost:3000/update", { artist: newArtist, id: id }).then(
      (response) => {
        setSongsList(
          songsList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  artist: newArtist,
                  dor: val.dor,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteSongs = (id) => {
    Axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
      setSongsList(
        songsList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Artist:</label>
        <input
          type="text"
          onChange={(event) => {
            setArtist(event.target.value);
          }}
        />
        <label>Date of release
        </label>
        <input
          type="text"
          onChange={(event) => {
            setDor(event.target.value);
          }}
        />
        
        <button onClick={addSongs}>Add Song</button>
      </div>
      <div className="songs">
        <button onClick={getSongs}>Show Songs</button>

        {songsList.map((val, key) => {
          return (
            <div className="songs">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Artist: {val.artist}</h3>
                <h3>dor: {val.dor}</h3>

              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewArtist(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateSongsArtist(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteSongs(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
