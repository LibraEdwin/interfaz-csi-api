import { Router } from 'express'
import { isSingleFileValid } from 'middlewares/files'
import * as NewController from './controller'

const router = Router()

router.get('/', NewController.index)

router.get('/tag/:idTag', NewController.getByTagId)
router.get('/:id', NewController.getById)

router.post('/', isSingleFileValid, NewController.create)

router.patch('/visibility/:id', NewController.changeVisibilityById)
router.patch('/:id', isSingleFileValid, NewController.updateById)

router.delete('/:id', NewController.removeById)

export default router
