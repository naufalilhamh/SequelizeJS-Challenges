var model = require("../models/index");
module.exports = function(app) {
  /* GET todo listing. */
  app.get("/books", function(req, res, next) {
    model.Books.findAll({})
      .then(books =>
        res.json({
          error: false,
          data: books
        })
      )
      .catch(error =>
        res.json({
          error: true,
          data: [],
          error: error
        })
      );
  });
  /* POST todo. */
  app.post("/books", function(req, res) {
    const {
      title,
      author,
      published_date,
      pages,
      language,
      publisher_id
    } = req.body;
    model.Books.create({
      title: title,
      author: author,
      published_date: published_date,
      pages: pages,
      language: language,
      publisher_id: publisher_id
    })
      .then(books =>
        res.status(201).json({
          error: false,
          data: books,
          message: "Buku Baru Sudah Ditambahkan!"
        })
      )
      .catch(error =>
        res.json({
          error: true,
          data: [],
          error: error
        })
      );
  });
  /* update todo. */
  app.put("/books/:id", function(req, res, next) {
    const books_id = req.params.id;
    const {
      title,
      author,
      published_date,
      pages,
      language,
      publisher_id
    } = req.body;
    model.Books.update(
      {
        title: title,
        author: author,
        published_date: published_date,
        pages: pages,
        language: language,
        publisher_id: publisher_id
      },
      {
        where: {
          id: books_id
        }
      }
    )
      .then(books =>
        res.json({
          error: false,
          message: "Buku Sudah DiUpdate!"
        })
      )
      .catch(error =>
        res.json({
          error: true,
          error: error
        })
      );
  });
  /* GET todo listing. */
  /* Delete todo. */
  app.delete("books/:id", function(req, res, next) {
    const books_id = req.params.id;
    model.Books.destroy({
      where: {
        id: books_id
      }
    })
      .then(status =>
        res.json({
          error: false,
          message: "todo has been delete."
        })
      )
      .catch(error =>
        res.json({
          error: true,
          error: error
        })
      );
  });
};
