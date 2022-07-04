// @ts-check
import { Router } from 'express'
import * as AdDetailController from './controller'

const router = Router()

router.get('/', AdDetailController.index)
router.get('/:id', AdDetailController.getById)
router.post('/', AdDetailController.create)
router.patch('/:id', AdDetailController.updateById)
router.delete('/:id', AdDetailController.removeById)

export default router
