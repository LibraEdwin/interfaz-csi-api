import { Router } from 'express'
import * as UserController from './controller'
import { authBasic, isAuthorize } from 'middlewares/auth/strategies'

const router = Router()

router.get('/', isAuthorize, UserController.index)
router.get('/:id', UserController.getById)
router.get('/email/:id', UserController.getByEmail)
router.post('/', UserController.create)
router.patch('/:id', UserController.updateById)
router.delete('/:id', UserController.removeById)
router.post('/login', authBasic, UserController.loginUser)
router.post('/logout', UserController.logoutUser)

export default router
