import { Router } from 'express';
import {
  createMusic,
  subscribeToMusic,
  unsubscribeToMusic,
  getAllMusic,
  getUserSubscribedMusic,
} from '../controllers/music.controller';
import {
  musicCreateSchema,
  musicSubscribeSchema,
  musicUnSubscribeSchema,
} from '../schemas/music.schema';
import { validateSchema } from '../utils/utils';
import { authorizer } from '../middlewares/app.middleware';

const router = Router();

router.route('/subscribed-music').get([authorizer], getUserSubscribedMusic);
router.route('').get([authorizer], getAllMusic);

router
  .route('/subscribe')
  .post([authorizer, validateSchema(musicSubscribeSchema)], subscribeToMusic)

  router
    .route('/unsubscribe')
    .post(
      [authorizer, validateSchema(musicUnSubscribeSchema)],
      unsubscribeToMusic
    );

router
  .route('/create')
  .post([authorizer, validateSchema(musicCreateSchema)], createMusic);

export default router;
