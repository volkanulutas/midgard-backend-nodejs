module.exports = app => {
  const messages = require("../controllers/message.controller.js");

  var router = require("express").Router();

  // Create a new Message
  router.post("/", messages.create);

  // Retrieve all Messages
  router.get("/", messages.findAll);

  // Retrieve all published Tutorials
  router.get("/notreturned", messages.findAllNotReturned);

  // Retrieve a single Tutorial with id
  router.get("/:id", messages.findOne);

  // Update a Tutorial with id
  router.put("/:id", messages.update);

  // Delete a Tutorial with id
  router.delete("/:id", messages.delete);

  // Delete all Tutorials
  router.delete("/", messages.deleteAll);

  app.use('/api/messages', router);
};
