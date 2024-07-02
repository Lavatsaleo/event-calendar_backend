module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    start_date: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    end_date: { 
      type: DataTypes.DATEONLY, 
      allowNull: false 
    },
    start_time: { 
      type: DataTypes.TIME, 
      allowNull: false 
    },
    end_time: { 
      type: DataTypes.TIME, 
      allowNull: false 
    },
    venue: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    theme: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    person: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
  });
  
  return Event;
};
