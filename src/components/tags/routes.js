// @ts-check
import { Router } from 'express'
import * as TagController from './controller'

const router = Router()

router.get('/', TagController.index)
router.get('/:id', TagController.getById)
router.post('/', TagController.create)
router.patch('/:id', TagController.updateById)
router.delete('/:id', TagController.removeById)

export default router
