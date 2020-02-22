import React, { useState, useEffect } from 'react'
// eslint-disable-next-line
import Api from '../../services/Api' 
// eslint-disable-next-line
import { getUserId } from '../../services/Auth'
import Toolbar from '../../components/Toolbar/Toolbar'
import Listagem from './Listagem/Listagem'
import './Dashboard.css'

export default props => {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    function findGenres() {
      let gen = []
      movies.forEach( mov => {
        gen = gen.concat(mov["genres"].filter( item => !gen.includes(item)))
      })

      setGenres(gen)
    }

    findGenres()
  }, [movies])


  useEffect(() => {
    async function fetchData() {

      //const response = await Api.get(`/film/recommendation/${getUserId}`)
      
      const raw = [
        {
          "genres": [
            "Thriller"
          ],
          "_id": "5da500ad6b3e251d74c78c14",
          "movieId": 457,
          "title": "Fugitive, The (1993)",
          "year": 1993,
          "imdbId": 106977,
          "tmdbId": 5503,
          "__v": 0
        },
        {
          "genres": [
            "Comedy",
            "Crime",
            "Drama",
            "Thriller"
          ],
          "_id": "5da500ae6b3e251d74c78c8e",
          "movieId": 608,
          "title": "Fargo (1996)",
          "year": 1996,
          "imdbId": 116282,
          "tmdbId": 275,
          "__v": 0
        },
        {
          "genres": [
            "Drama",
            "War"
          ],
          "_id": "5da500ad6b3e251d74c78c53",
          "movieId": 527,
          "title": "Schindler's List (1993)",
          "year": 1993,
          "imdbId": 108052,
          "tmdbId": 424,
          "__v": 0
        },
        {
          "genres": [
            "Action",
            "Adventure",
            "Sci-Fi"
          ],
          "_id": "5da500ad6b3e251d74c78b66",
          "movieId": 260,
          "title": "Star Wars: Episode IV - A New Hope (1977)",
          "year": 1977,
          "imdbId": 76759,
          "tmdbId": 11,
          "__v": 0
        },
        {
          "genres": [
            "Animation",
            "Children",
            "Fantasy",
            "Musical"
          ],
          "_id": "5da500ae6b3e251d74c78e5b",
          "movieId": 1282,
          "title": "Fantasia (1940)",
          "year": 1940,
          "imdbId": 32455,
          "tmdbId": 756,
          "__v": 0
        },
        {
          "genres": [
            "Action",
            "Adventure",
            "Sci-Fi",
            "Thriller"
          ],
          "_id": "5da500b16b3e251d74c79553",
          "movieId": 3703,
          "title": "Road Warrior, The (Mad Max 2) (1981)",
          "year": 1981,
          "imdbId": 82694,
          "tmdbId": 8810,
          "__v": 0
        },
        {
          "genres": [
            "Drama",
            "Romance"
          ],
          "_id": "5da500b06b3e251d74c792e7",
          "movieId": 2858,
          "title": "American Beauty (1999)",
          "year": 1999,
          "imdbId": 169547,
          "tmdbId": 14,
          "__v": 0
        },
        {
          "genres": [
            "Action",
            "Crime"
          ],
          "_id": "5da500b06b3e251d74c7926a",
          "movieId": 2692,
          "title": "Run Lola Run (Lola rennt) (1998)",
          "year": 1998,
          "imdbId": 130827,
          "tmdbId": 104,
          "__v": 0
        },
        {
          "genres": [
            "Animation",
            "Children",
            "Fantasy",
            "Musical"
          ],
          "_id": "5da500ae6b3e251d74c78c87",
          "movieId": 596,
          "title": "Pinocchio (1940)",
          "year": 1940,
          "imdbId": 32910,
          "tmdbId": 10895,
          "__v": 0
        },
        {
          "genres": [
            "Drama"
          ],
          "_id": "5da500ad6b3e251d74c78c23",
          "movieId": 475,
          "title": "In the Name of the Father (1993)",
          "year": 1993,
          "imdbId": 107207,
          "tmdbId": 7984,
          "__v": 0
        },
        {
          "genres": [
            "Animation",
            "Children",
            "Comedy",
            "Musical"
          ],
          "_id": "5da500af6b3e251d74c7908d",
          "movieId": 2078,
          "title": "Jungle Book, The (1967)",
          "year": 1967,
          "imdbId": 61852,
          "tmdbId": 9325,
          "__v": 0
        },
        {
          "genres": [
            "Adventure",
            "Children",
            "Fantasy",
            "Musical"
          ],
          "_id": "5da500ae6b3e251d74c78d43",
          "movieId": 919,
          "title": "Wizard of Oz, The (1939)",
          "year": 1939,
          "imdbId": 32138,
          "tmdbId": 630,
          "__v": 0
        },
        {
          "genres": [
            "Comedy"
          ],
          "_id": "5da500ae6b3e251d74c78dba",
          "movieId": 1080,
          "title": "Monty Python's Life of Brian (1979)",
          "year": 1979,
          "imdbId": 79470,
          "tmdbId": 583,
          "__v": 0
        },
        {
          "genres": [
            "Adventure",
            "Comedy",
            "Fantasy"
          ],
          "_id": "5da500ae6b3e251d74c78de5",
          "movieId": 1136,
          "title": "Monty Python and the Holy Grail (1975)",
          "year": 1975,
          "imdbId": 71853,
          "tmdbId": 762,
          "__v": 0
        },
        {
          "genres": [
            "Action",
            "Adventure",
            "Sci-Fi"
          ],
          "_id": "5da500ae6b3e251d74c78e08",
          "movieId": 1196,
          "title": "Star Wars: Episode V - The Empire Strikes Back (1980)",
          "year": 1980,
          "imdbId": 80684,
          "tmdbId": 1891,
          "__v": 0
        },
        {
          "genres": [
            "Action",
            "Adventure",
            "Comedy",
            "Fantasy",
            "Romance"
          ],
          "_id": "5da500ae6b3e251d74c78e09",
          "movieId": 1197,
          "title": "Princess Bride, The (1987)",
          "year": 1987,
          "imdbId": 93779,
          "tmdbId": 2493,
          "__v": 0
        },
        {
          "genres": [
            "Action",
            "Adventure",
            "Fantasy"
          ],
          "_id": "5da500af6b3e251d74c78f2c",
          "movieId": 1587,
          "title": "Conan the Barbarian (1982)",
          "year": 1982,
          "imdbId": 82198,
          "tmdbId": 9387,
          "__v": 0
        },
        {
          "genres": [
            "Action",
            "Adventure"
          ],
          "_id": "5da500ae6b3e251d74c78e64",
          "movieId": 1291,
          "title": "Indiana Jones and the Last Crusade (1989)",
          "year": 1989,
          "imdbId": 97576,
          "tmdbId": 89,
          "__v": 0
        },
        {
          "genres": [
            "Comedy",
            "Drama",
            "Romance"
          ],
          "_id": "5da500ad6b3e251d74c78b4c",
          "movieId": 232,
          "title": "Eat Drink Man Woman (Yin shi nan nu) (1994)",
          "year": 1994,
          "imdbId": 111797,
          "tmdbId": 10451,
          "__v": 0
        },
        {
          "genres": [
            "Comedy",
            "Fantasy"
          ],
          "_id": "5da500af6b3e251d74c790e2",
          "movieId": 2174,
          "title": "Beetlejuice (1988)",
          "year": 1988,
          "imdbId": 94721,
          "tmdbId": 4011,
          "__v": 0
        },
        {
          "genres": [
            "Animation",
            "Children",
            "Fantasy",
            "Musical"
          ],
          "_id": "5da500ae6b3e251d74c78d95",
          "movieId": 1025,
          "title": "Sword in the Stone, The (1963)",
          "year": 1963,
          "imdbId": 57546,
          "tmdbId": 9078,
          "__v": 0
        },
        {
          "genres": [
            "Adventure",
            "Fantasy",
            "Musical"
          ],
          "_id": "5da500af6b3e251d74c7902a",
          "movieId": 1967,
          "title": "Labyrinth (1986)",
          "year": 1986,
          "imdbId": 91369,
          "tmdbId": 13597,
          "__v": 0
        },
        {
          "genres": [
            "Children",
            "Comedy",
            "Fantasy",
            "Musical"
          ],
          "_id": "5da500ae6b3e251d74c78db5",
          "movieId": 1073,
          "title": "Willy Wonka & the Chocolate Factory (1971)",
          "year": 1971,
          "imdbId": 67992,
          "tmdbId": 252,
          "__v": 0
        },
        {
          "genres": [
            "Crime",
            "Mystery",
            "Thriller"
          ],
          "_id": "5da500ad6b3e251d74c78ab4",
          "movieId": 50,
          "title": "Usual Suspects, The (1995)",
          "year": 1995,
          "imdbId": 114814,
          "tmdbId": 629,
          "__v": 0
        },
        {
          "genres": [
            "Adventure",
            "Drama",
            "Western"
          ],
          "_id": "5da500ae6b3e251d74c78c82",
          "movieId": 590,
          "title": "Dances with Wolves (1990)",
          "year": 1990,
          "imdbId": 99348,
          "tmdbId": 581,
          "__v": 0
        },
        {
          "genres": [
            "Comedy",
            "Crime",
            "Drama",
            "Thriller"
          ],
          "_id": "5da500ad6b3e251d74c78b87",
          "movieId": 296,
          "title": "Pulp Fiction (1994)",
          "year": 1994,
          "imdbId": 110912,
          "tmdbId": 680,
          "__v": 0
        },
        {
          "genres": [
            "Crime",
            "Horror",
            "Thriller"
          ],
          "_id": "5da500ae6b3e251d74c78c84",
          "movieId": 593,
          "title": "Silence of the Lambs, The (1991)",
          "year": 1991,
          "imdbId": 102926,
          "tmdbId": 274,
          "__v": 0
        },
        {
          "genres": [
            "Comedy",
            "Crime"
          ],
          "_id": "5da500af6b3e251d74c78f98",
          "movieId": 1732,
          "title": "Big Lebowski, The (1998)",
          "year": 1998,
          "imdbId": 118715,
          "tmdbId": 115,
          "__v": 0
        },
        {
          "genres": [
            "Crime",
            "Drama"
          ],
          "_id": "5da500ae6b3e251d74c78e18",
          "movieId": 1213,
          "title": "Goodfellas (1990)",
          "year": 1990,
          "imdbId": 99685,
          "tmdbId": 769,
          "__v": 0
        },
        {
          "genres": [
            "Drama",
            "Mystery",
            "Thriller"
          ],
          "_id": "5da500b16b3e251d74c79464",
          "movieId": 3386,
          "title": "JFK (1991)",
          "year": 1991,
          "imdbId": 102138,
          "tmdbId": 820,
          "__v": 0
        }
      ]
      
      //setMovies(response.data)
      setMovies(raw)
    }
    fetchData()
  }, [])

  return (
    <div className="dashboard">
      <Toolbar history={props.history}/>
      {genres.map( genre => (
        <div key={genre}>
          <h3>Filmes do gênero <span style={{color: '#6C63FF'}}>{genre}</span></h3>
          <Listagem movies={movies.filter( mov => mov["genres"].includes(genre))}/>
        </div>
      ))}
    </div>
  )
}