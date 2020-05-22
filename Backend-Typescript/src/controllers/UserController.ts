import { Request, Response } from 'express'
import LoadDataService from '../services/LoadDataService'
import User from '../schemas/User'

class UserController {
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body

      let user = await User.findOne({ email })

      if (user) return res.status(400).send({ error: 'Usuário já existe.' })

      user = await User.create(req.body)

      return res.send({ user: { ...user.toJSON(), password: null }, token: user.generateToken() })
    } catch (e) {
      return res.status(400).send({ error: 'Falha no cadastro. ' + e })
    }
  }

  async update (req: Request, res: Response): Promise<Response> {
    try {
      const loggedUser = res.locals.user

      const { id } = req.params

      const { name, avatar, genres } = req.body

      if (loggedUser === id) await User.findOneAndUpdate({ _id: id }, { name, avatar, genres })

      else throw new Error('Não autorizado.')

      return res.status(200).send({ message: 'Atualizado com sucesso.' })
    } catch (e) {
      return res.status(400).send({ error: 'Falha na atualizacao. ' + e })
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const user = res.locals.user

    try {
      let result

      if (user === req.params.id) result = await User.deleteOne({ _id: req.params.id })

      else throw new Error('Você precisa estar logado para deletar o usuário.')

      if (result !== undefined && result.n && result.n > 0) return res.status(200).send({ message: 'Deletado com sucesso.' })

      else return res.status(400).send({ error: 'Falha ao remover. Usuário não encontrado.' })
    } catch (e) {
      return res.status(400).send({ error: 'Falha ao remover. ' + e })
    }
  }

  async loadFromCSV (req: Request, res: Response): Promise<Response> {
    await LoadDataService.loadUsersFromCSV()

    return res.send('Dados carregados com sucesso.')
  }
}

export default new UserController()
