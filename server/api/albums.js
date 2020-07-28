const router = require("express").Router()
const { Album, Artist, Song } = require("../db")

router.get("/", async (req,res,next) => {
  try {
    // eager loading: also called lazy loading, is the process of querying
    // a entity and all other related entities; done with an include attribute
    const albums = await Album.findAll({
        include: {
            model: Artist,
        }
    })

    res.send(albums);
  } 
  catch(err) {
     next(err);
  }
});

router.get("/:albumId", async (req,res,next) => {
    try {
        const album = await Album.findAll({
            where: {
                id: req.params.albumId,
            },
            include: [{
                  model: Artist,
                },
                { model: Song,
                    where: {
                      albumId: req.params.albumId,
                    }
                }
            ],
        });
        
        res.send(album);
    }
    catch(err) {
        next(err);
    }
})

module.exports = router