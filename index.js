const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("react-app/dist"));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

app.get("/api/pirates/:id", (req, res) => {
  const id = req.params.id;
  const pirate = getPirate(id);
  if (!pirate) {
    res.status(404).send(`Pirate ${id} not found`);
    return;
  } else {
    res.send({ data: pirate });
  }
});

function getPirate(id) {
    const pirates = [
        { id: 1, name: "Blackbeard", active: true, country: "England" },
        { id: 2, name: "Anne Bonny", active: true, country: "Ireland" },
        { id: 3, name: "Calico Jack", active: false, country: "England" },
        { id: 4, name: "Bartholomew Roberts", active: true, country: "Wales" },
        { id: 5, name: "Mary Read", active: false, country: "England" }
    ];
    return pirates.find((pirate) => pirate.id == id);
}