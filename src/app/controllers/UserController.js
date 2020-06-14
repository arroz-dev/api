const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const createJwt = (user) => {
  const { _id: id } = user;

  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '1d',
    }
  );

  return token;
};

class UserController {
  async store(req, res) {
    const { number } = req.body;

    const oldUser = await userModel.findOne({ number });

    if (oldUser) {
      return res.status(400).json({ error: 'Usuario ja existe' });
    }

    const user = await userModel.create(req.body);

    const token = createJwt(user);

    return res.status(201).json({ token });
  }

  async auth(req, res) {
    const { number, password } = req.body;

    const user = await userModel.findOne({
      number,
    });

    if (!user) {
      return res.status(400).json({ msg: 'Usuario não encontrado' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        error: 'Credenciais invalidas',
      });
    }

    const token = createJwt(user);

    return res.json({
      token,
    });
  }

  async index(req, res) {
    const { userId: id } = req;
    const user = await userModel.findById({ id });
    return res.status(200).json({ user });
  }

  async update(req, res) {
    const { userId: id } = req;
    const user = await userModel.findByIdAndUpdate({ id }, req.body, {
      new: true,
    });
    return res.status(201).json({ user });
  }
}

module.exports = new UserController();
