module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("contacts", {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });
    return Contact;
  };