// @ts-check
import { Router } from 'express'
import * as AdController from './controller'

const router = Router()

router.get('/', AdController.index)
router.get('/:id', AdController.getById)
router.post('/', AdController.create)
router.patch('/:id', AdController.updateById)
router.delete('/:id', AdController.removeById)

export default router
