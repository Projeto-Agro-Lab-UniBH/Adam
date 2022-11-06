import express from "express";
import { createUserAccountController, loginController, logoutController, updateUserAccountController, deleteUserAccountController, findAllController, findByIdController } from ".";

export const routes = express.Router();

routes.post('/create', async (request, response) => {
  return await createUserAccountController.handle(request, response);
})

routes.post('/login', async (request, response) => {
  return await loginController.handle(request, response);
})

routes.post('/logout', (request, response) => {
  return logoutController.handle(request, response);
})

routes.put('/update/:id', async (request, response) => {
  return await updateUserAccountController.handle(request, response);
})

routes.delete('/delete/:id', async (request, response) => {
  return await deleteUserAccountController.handle(request, response);
})

routes.get('/data/:id', async (request, response) => {
  return await findByIdController.handle(request, response);
})

routes.get('/data/list/profiles/', async (request, response) => {
  return await findAllController.handle(request, response);
})

