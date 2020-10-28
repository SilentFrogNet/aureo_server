import express from 'express';
import { indexPage, getMessagesList, addMessage } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/messages', getMessagesList);
indexRouter.post('/messages', addMessage);

export default indexRouter;
