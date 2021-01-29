import * as db from "../../models";
import { Request, Response } from "express";

function login(req: Request, res: Response) {
  db.User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(404).json({ error: "User not found." })
      } else if (!user.validatePassword(req.body.password)) {
        res.status(401).json({ error: "Incorrect Credentials." })
      } else {
        user.password = "";
        res.status(200).json(user);
      }
    })
    .catch((err: Error) => {
      res.json(err);
    })
};

function create(req: Request, res: Response) {
  db.User
    .create(req.body)
    .then(user => {
      user.password = "";
      res.status(200).json(user);
    })
    .catch((err: Error) => {
      res.status(422).json(err);
    })
};

export { login, create }