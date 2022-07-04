import { Router } from 'express'
import * as BucketController from './controller'

const router = Router()

router.get('/', BucketController.index)
router.get('/files', BucketController.getFiles)

router.post('/file', BucketController.uploadFile)
router.post('/files', BucketController.uploadFiles)

export default router
