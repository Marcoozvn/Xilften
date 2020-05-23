/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../schemas/User'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

class AuthController {
  async verifyToken (req: Request, res: Response, next: NextFunction): Promise<unknown> {
    const token = req.headers.authorization
    const secret: string = process.env.SECRET ? process.env.SECRET : ''

    if (!token) return res.status(403).send({ error: 'Token não fornecido.' })
    verify(token.replace('Bearer ', ''), secret, (err, decoded) => {
      if (decoded) res.locals.user = (decoded as any).id
      if (err) return res.status(403).send({ error: 'Falha ao autenticar token.' })
      next()
    })
  }

  async login (req: Request, res: Response): Promise<Response> {
    const user = await User.findOne({ username: req.body.username })

    if (!user) {
      return res.status(500).send({ error: 'Usuário não encontrado' })
    }

    const match = await user.comparePassword(req.body.password)

    if (match) {
      return res.status(200).send({ user: { ...user.toJSON(), password: null }, token: user.generateToken() })
    } else {
      return res.status(400).send({ error: 'Credenciais Inválidas' })
    }
  }
}

export default new AuthController()
