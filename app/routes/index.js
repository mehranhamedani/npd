import { Router } from 'express'
import foodRouter from './lib/food'

const router = Router()

router.use('/food/', foodRouter)

export default router
