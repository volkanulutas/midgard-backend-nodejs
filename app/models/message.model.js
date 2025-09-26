module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    name: {
      type: Sequelize.STRING
    },

    telephone: {
      type: Sequelize.STRING
    },

    email: {
      type: Sequelize.STRING
    },

    subject: {
      type: Sequelize.STRING
    },

    content: {
      type: Sequelize.TEXT,   // Uzun mesajları saklamak için uygun
      allowNull: false
    },

    isReturned: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },

    receivedAt: {
      type: Sequelize.DATE,   // Mesajın geliş zamanı
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    
    returnedAt: {
      type: Sequelize.DATE,   // Mesajın dönüş zamanı
      allowNull: true
    }
  }, {
    hooks: {
      beforeUpdate: (message, options) => {
        if (message.changed("isReturned") && message.isReturned === true) {
          message.returnedAt = new Date();  // dönüş zamanı otomatik atanır
        }
      }
    }
  });
  return Message;
};
