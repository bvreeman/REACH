module.exports = function(sequelize, DataTypes) {
  const Contact = sequelize.define('contacts', {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
  });
  return Contact;
};
