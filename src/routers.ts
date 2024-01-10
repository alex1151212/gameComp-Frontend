const router = [
  {
    path: "/home",
    name: "home",
  },
  {
    path: "/games",
    name: "games",
  },
  {
    path: "/rules",
    name: "rules",
  },

  {
    path: "/agenda",
    name: "agenda",
  },
  {
    path: "/posts",
    name: "Posts",
  },
  {
    path: "/posts/detail",
    name: "Posts",
    inVisible: true,
  },
  {
    path: "/info",
    name: "info",
  },
  {
    path: "/sponsors",
    name: "sponsors",
  },
  {
    path: "/live",
    name: "live",
  },
  {
    path: "/login",
    name: "login",
  },
  {
    path: "/register",
    name: "register",
    inVisible: true,
  },
  {
    path: "/auth/profile",
    name: "profile",
  },
  {
    path: "/auth/logout",
    name: "logout",
  },
];
export default router;
