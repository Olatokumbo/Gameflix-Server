const Game = require("../models/game");
const db = require("../config/database");
const { getFileStream } = require("../s3");

//////ADD GAMES
const addGame = (req, res) => {
  const { title, genre, posterURL, coverURL } = req.body;
  const newGame = new Game({
    title,
    genre,
    posterURL,
    coverURL,
    reviews: [],
  });

  newGame.save().then((user) => {
    res.status(200).json(user);
  });
};

//////LIST GAMES BY GENRE
const genreList = async (req, res) => {
  const { genre } = req.params;

  const data = await db
    .collection("games")
    .aggregate([
      {
        $match: { genre },
      },
      {
        $project: {
          _id: "$_id",
          title: "$title",
          posterURL: "$posterURL",
          avgRatings: { $avg: "$reviews.rating" },
          reviews: { $size: "$reviews" },
        },
      },
    ])
    .toArray();
  res.status(200).json(data);
};

//////GET GAME INFO
const gameInfo = (req, res) => {
  const { id } = req.params;
  Game.findById(id)
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((err) => {
      return res.status(404).json({ message: err.message });
    });
};

const getImage = (req, res) => {
  try {
    const readStream = getFileStream(req.params.key);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addGame,
  genreList,
  gameInfo,
  getImage,
};
