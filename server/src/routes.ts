import express from 'express';
import ClassesControllers from './controllers/ClassesControllers';
import ConnectionsControllers from './controllers/ConnectionControllers';


const routes = express.Router();

const classesControlers = new ClassesControllers();
const connectionsControlers = new ConnectionsControllers();

routes.post('/classes', classesControlers.create)
routes.get('/classes', classesControlers.index)

routes.get('/connections', connectionsControlers.index)
routes.post('/connections', connectionsControlers.create)
export default routes;