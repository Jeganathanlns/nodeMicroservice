const repo = require('../repositories/user.repository');
const proxy = require('../proxy/user.proxy');

exports.getAllUsers = async () => {
  const localUsers = await repo.findAll();
  const externalUsers = await proxy.fetchExternalUsers();
  return [...localUsers, ...externalUsers];
};
