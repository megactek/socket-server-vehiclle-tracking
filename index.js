const io = require("socket.io")(3002, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("updateCoord", ({ truckId, lat, long }) => {
    console.log("sent coordinates ", lat, long, " to ", truckId);
    io.emit("newCoord", { truckId, lat, long });
    io.emit("refreshCoord", {});
  });

  socket.on("deleteCoord", () => {
    console.log("refreshed");
    io.emit("refreshCoord", {});
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});
