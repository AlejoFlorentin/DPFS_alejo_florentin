let db = require('../../database/models');

const usersApiController = {
  getAll: async (req, res) => {
    try {
      const users = await db.User.findAll({
        attributes: { exclude: ['password', 'updated_at', 'category_id'] },
        include: [{ association: 'image', attributes: ['url'] }],
      });

      const usersWithUrl = users.map(user => {
        return {
          ...user.toJSON(),
          detail: `/users/${user.id}`,
        };
      });
      return res.status(200).json({
        total: usersWithUrl.length,
        users: usersWithUrl,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id, {
        attributes: {
          exclude: ['password', 'category_id'],
        },
        include: [{ association: 'image', attributes: ['url'] }],
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found', status: 404 });
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = usersApiController;
