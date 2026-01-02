module.exports = {
  apps: [
    {
      name: "backend",
      script: "server.js",
      exec_mode: "fork",
      interpreter: "node",
      node_args: "--experimental-modules",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
