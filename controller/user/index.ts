import * as db from "../../models";
import UserMethods from "../../models/user";

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

export { login, create }