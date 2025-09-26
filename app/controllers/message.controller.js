const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;
const { sendMail } = require("../mailservice/mailService"); // Mail gönderimi

exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // DB’ye kaydet
    const message = await Message.create({
      name: req.body.name,
      telephone: req.body.telephone,
      email: req.body.email,
      subject: req.body.subject,
      content: req.body.content,
      isReturned: req.body.isReturned,
      receivedAt: req.body.isReceivedAt,  // senin modelde receivedAt vardı
      returnedAt: null
    });

    // Mail gönder
    await sendMail(message);

    // Başarılı yanıt dön
    res.status(201).send({
      message: "Mesaj kaydedildi ve mail gönderildi!",
      data: message
    });
  } catch (err) {
    console.error("Hata:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Message."
    });
  }
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  console.log("Message findAll. ");
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Message.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Messages."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  console.log("Message findOne. ");
  const id = req.params.id;

  Message.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Message with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Message with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  console.log("Message update. " );
  const id = req.params.id;

  Message.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Message with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  console.log("Message delete. " );
  const id = req.params.id;

  Message.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Message with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Message with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  console.log("Message deleteAll. " );
  Message.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllNotReturned = (req, res) => {
  console.log("Message findAllPublished ");
  Message.findAll({ where: { isReturned: false } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Messages."
      });
    });
};

