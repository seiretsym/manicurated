import * as db from "../../models";
import { Request, Response } from "express";

async function login(req: Request, res: Response) {
  try {
    const user = await db.User.findOne({ email: req.body.email })
    if (!user) {
      res.status(404).json({ error: "User not found." })
    } else if (!user.validatePassword(req.body.password)) {
      res.status(401).json({ error: "Incorrect Credentials." })
    } else {
      user.password = "";
      res.status(200).json(user);
    }
  }
  catch (err) {
    res.json(err);
  }
};

async function create(req: Request, res: Response) {
  try {
    const user = await db.User.create(req.body)
    user.password = "";
    res.status(200).json(user);
  }
  catch (err) {
    res.status(422).json(err);
  }
};

async function remove(req: Request, res: Response) {
  try {
    const user = await db.User.findOne({ _id: req.params.id });
    await user.cascadeDelete();
    await db.User.deleteOne({ _id: req.params.id });
    console.log(`User: '${user.email}' Removed`)
    res.status(200).json({ ok: "Account Deleted" });
  }
  catch (err) {
    res.status(422).json(err);
  }
}

export { login, create, remove }