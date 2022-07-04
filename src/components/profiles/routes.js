// @ts-check
import { Router } from 'express'
import * as ProfileController from './controller'

const router = Router()

router.get('/', ProfileController.index)
router.get('/:id', ProfileController.getById)
router.post('/', ProfileController.create)
router.patch('/:id', ProfileController.updateById)
router.delete('/:id', ProfileController.removeById)

export default router
