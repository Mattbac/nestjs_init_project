import { RoleType } from "src/type/role-type";

export default [
  {
    email: "supadmin@beable.fr",
    role: RoleType.SUP_ADMIN,
    password: "secret",
  },
  {
    email: "admin@beable.fr",
    role: RoleType.ADMIN,
    password: "secret",
  },
];