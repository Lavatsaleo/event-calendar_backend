module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      date: { type: DataTypes.STRING, allowNull: false },
      time: { type: DataTypes.STRING, allowNull: false },
      venue: { type: DataTypes.STRING, allowNull: false },
      theme: { type: DataTypes.STRING, allowNull: false },
      person: { type: DataTypes.STRING, allowNull: false },
    });
    
    return Event;
  };
  