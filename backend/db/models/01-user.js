// User Model
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User extends Model {
  static associate(models) {
    User.hasMany(models.Event, { foreignKey: 'UserId' });
    User.hasMany(models.Photo, {
  foreignKey: 'uploadedById',
  as: 'uploadedPhotos'
});
    User.belongsTo(models.Event, {
      foreignKey: 'primaryEventId',
      as: 'primaryEvent'
    });
  }

  async matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  getSignedJwtToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  }

  isEventPlanner() {
    return ['admin', 'bride', 'groom', 'event_planner', 'planning_team'].includes(this.role);
  }

  canEditEvent() {
    return (
      ['admin', 'bride', 'groom', 'event_planner'].includes(this.role) ||
      (this.role === 'planning_team' && ['edit', 'full'].includes(this.planningPermissions))
    );
  }

  isPrimaryStakeholder() {
    return ['admin', 'bride', 'groom', 'event_planner'].includes(this.role);
  }
}

module.exports = (sequelize) => {
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    avatar: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM(
        'user',
        'admin',
        'bride',
        'groom',
        'event_planner',
        'planning_team',
        'vendor',
        'attendee'
      ),
      defaultValue: 'user'
    },
    eventRole: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Specific role in the event (e.g., "Mother of the Bride", "Best Man", "Bridesmaid")'
    },
    planningPermissions: {
      type: DataTypes.ENUM('none', 'view', 'edit', 'full'),
      defaultValue: 'none',
      comment: 'Access level for event planning features'
    },
    isVendor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    primaryEventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Events',
        key: 'id'
      },
      comment: 'Primary event this user is associated with'
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpire: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
    timestamps: true,
    hooks: {
  beforeCreate: async (user) => {
    if (user.password && !user.password.startsWith('$2')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  },
  beforeUpdate: async (user) => {
    if (user.changed('password') && !user.password.startsWith('$2')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
}
  });

  return User;
};
    // hooks: {
    //   beforeCreate: async (user) => {
    //     if (user.password) {
    //       const salt = await bcrypt.genSalt(10);
    //       user.password = await bcrypt.hash(user.password, salt);
    //     }
    //   },
    //   beforeUpdate: async (user) => {
    //     if (user.changed('password')) {
    //       const salt = await bcrypt.genSalt(10);
    //       user.password = await bcrypt.hash(user.password, salt);
    //     }
    //   }
    // }
//   });

//   return User;
// };