module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },

        spotifyId: {
            type: DataTypes.STRING,
            allowNull: false
        },

        spotifyAccessToken: {
            type: DataTypes.STRING,
            allowNull: false
        },

        spotifyRefreshToken: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return User;
};
