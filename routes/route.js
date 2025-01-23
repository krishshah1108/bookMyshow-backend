import adminRoutes from "./admin/index.js";
import userRoutes from "./users/index.js";
const route = [
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
];

export default route;
