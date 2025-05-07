const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
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
    type: DataTypes.ENUM('user', 'admin', 'bride', 'groom', 'event_planner', 'planning_team', 'vendor', 'attendee'),
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
    allowNull: true,
    comment: 'Reference to vendor table if user is associated with vendor'
  },
  primaryEventId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Primary event this user is associated with (e.g., which wedding)'
  },
  resetPasswordToken: {
    type: DataTypes.STRING
  },
  resetPasswordExpire: {
    type: DataTypes.DATE
  }
}, {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : undefined,
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Match user entered password to hashed password in database
User.prototype.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
User.prototype.getSignedJwtToken = function() {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Check if user is part of event planning team
User.prototype.isEventPlanner = function() {
  return ['admin', 'bride', 'groom', 'event_planner', 'planning_team'].includes(this.role);
};

// Check if user has edit permissions for event planning
User.prototype.canEditEvent = function() {
  return ['admin', 'bride', 'groom', 'event_planner'].includes(this.role) ||
         (this.role === 'planning_team' && ['edit', 'full'].includes(this.planningPermissions));
};

// Check if user is a primary stakeholder in the event
User.prototype.isPrimaryStakeholder = function() {
  return ['admin', 'bride', 'groom', 'event_planner'].includes(this.role);
};

module.exports = User;