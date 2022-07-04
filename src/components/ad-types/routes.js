// @ts-check
import { Router } from 'express'
import * as AdTypeController from './controller'

const router = Router()

router.get('/', AdTypeController.index)
router.get('/:id', AdTypeController.getById)
router.post('/', AdTypeController.create)
router.patch('/:id', AdTypeController.updateById)
router.delete('/:id', AdTypeController.removeById)

export default router
