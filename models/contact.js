module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });
    return Contact;
  };