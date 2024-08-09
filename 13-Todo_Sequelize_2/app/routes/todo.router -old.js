"use strict";
/* -------------------------------------------------------------------------- */
//-                  EXPRESSJS - TODO Project with Sequelize                  */
//__                 It have been creating before controller                  */
/* -------------------------------------------------------------------------- */

const router = require("express").Router();

//, Model :
const Todo = require("../models/todo.model");

//.. LIST TODOS:
router.get("/", async (req, res) => {
  // const data = await Todo.findAll()
  const data = await Todo.findAndCountAll(); //, Verileri hem getir hem say demiş oluruz.

  res.status(200).send({
    error: false,
    result: data,
  });
});

//! CRUD: Create Read Update Delete

//.. CREATE TODO:
router.post("/", async (req, res) => {
  // const receivedData = req.body
  // console.log(receivedData)

  // const data = await Todo.create({
  //     title: receivedData.title,
  //     description: receivedData.description,
  //     priority: receivedData.priority,
  //     isDone: receivedData.isDone
  // })
  // console.log(data)

  const data = await Todo.create(req.body);
  // console.log(data)

  res.status(201).send({
    error: false,
    result: data.dataValues,
  });
});

//.. READ TODO:
router.get("/:id", async (req, res) => {
  // const data = await Todo.findOne({ where: { id: req.params.id } }); //, olması gereken budur.
  const data = await Todo.findByPk(req.params.id);

  res.status(200).send({
    error: false,
    result: data,
  });
});

//.. UPDATE TODO:
router.put("/:id", async (req, res) => {
  // const data = await Todo.update({ ...newData }, { ...filter });
  const data = await Todo.update(req.body, { where: { id: req.params.id } });
  // console.log(data);

  res.status(202).send({
    error: false,
    result: data,
    message: data[0] >= 1 ? "Updated" : "Can not be updated.",
    new: await Todo.findByPk(req.params.id), // Güncellenmiş kaydı göster.
  });
});

//.. DELETE TODO:
router.delete("/:id", async (req, res) => {
  // const data = await Todo.destroy({ ...filter });
  const data = await Todo.destroy({ where: { id: req.params.id } });
  console.log(data);

  // res.status(204).send({
  //   error: false,
  //   result: data,
  //   message: data >= 1 ? "Deleted." : "Can not Deleted",
  // });

  if (data >= 1) {
    //, Deleted
    // res.status(204).send({
    //   error: false,
    //   result: data,
    //   message: "Deleted",
    // });

    //, sadece status code çıktısı ver:
    res.sendStatus(204);
  } else {
    //, Not Deleted
    // res.status(404).send({
    //   error: true,
    //   result: data,
    //   message: "Can not be Deleted",
    // });

    //, Send to ErrorHandler:
    res.errorStatusCode = 404;
    throw new Error("Can not Deleted. Maybe already deleted.");
  }
});

/* -------------------------------------------------------------------------- */

//! Module Export:
module.exports = router;
