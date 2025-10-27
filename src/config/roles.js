// An application depends on what roles it will have.

const allRoles = {
  client: ["common", "client"],
  admin: ["common", "admin", "admin"],
  employ: ["common", "employ", "employ"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
