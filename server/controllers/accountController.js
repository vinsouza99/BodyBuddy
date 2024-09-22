import Account from '../models/Account.js';

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json({
      status: '200',
      message: 'Success',
      data: accounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: '500',
      message: 'Internal Server Error',
    });
  }
};

export const getAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({
        status: '404',
        message: 'Account not found',
      });
    }
    res.status(200).json({
      status: '200',
      message: 'Success',
      data: account,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: '500',
      message: 'Internal Server Error',
    });
  }
};

export const createAccount = async (req, res) => {
  try {
    const { username, email, password_hash, first_name, last_name, date_of_birth, phone_number, profile_image_url } = req.body;
    const newAccount = await Account.create({
      username,
      email,
      password_hash,
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      profile_image_url,
    });
    res.status(201).json({
      status: '201',
      message: 'Account created successfully',
      data: newAccount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: '500',
      message: 'Internal Server Error',
    });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({
        status: '404',
        message: 'Account not found',
      });
    }

    await account.update(updatedData);
    res.status(200).json({
      status: '200',
      message: 'Account updated successfully',
      data: account,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: '500',
      message: 'Internal Server Error',
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({
        status: '404',
        message: 'Account not found',
      });
    }

    await account.destroy();
    res.status(200).json({
      status: '200',
      message: 'Account deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: '500',
      message: 'Internal Server Error',
    });
  }
};
