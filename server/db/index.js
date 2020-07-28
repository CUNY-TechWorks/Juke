const db = require('./db')
const Album = require("./album");
const Artist = require("./artist");
const Song = require("./song");

// ...and give them some nice associations here!

Album.hasMany(Song);
Song.belongsTo(Album);

Artist.hasMany(Song);
Song.belongsTo(Artist);

Artist.hasMany(Album);
Album.belongsTo(Artist);

module.exports = {
  db,
  Album,
  Artist,
  Song,
}
