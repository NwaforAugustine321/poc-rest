import { Router } from 'express';
import { login, signup } from '../controllers/user.controller';
import {
  loginSchema,
  signupSchema,
} from '../schemas/user.schema';
import { validateSchema } from '../utils/utils';

const router = Router();

router.route('/signup').post([validateSchema(signupSchema)], signup);
router.route('/login').post([validateSchema(loginSchema)], login);

export default router;
