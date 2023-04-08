import express, { request, response } from "express";
import { createUserAccountController, loginController, logoutController, updateUserAccountController, deleteUserAccountController, findAllController, findByIdController, authenticatedUserController } from ".";

export const routes = express.Router();

routes.post('/api/v1/create', async (request, response) => {
  return await createUserAccountController.handle(request, response);
})

routes.get('/api/v1/data/:id', async (request, response) => {
  return await findByIdController.handle(request, response);
})

routes.get('/api/v1/data/list/profiles/', async (request, response) => {
  return await findAllController.handle(request, response);
})

routes.put('/api/v1/update/:id', async (request, response) => {
  return await updateUserAccountController.handle(request, response);
})

routes.delete('/api/v1/delete/:id', async (request, response) => {
  return await deleteUserAccountController.handle(request, response);
})

routes.post('/api/v1/login', async (request, response) => {
  return await loginController.handle(request, response);
})

routes.post('/api/v1/logout', (request, response) => {
  return logoutController.handle(request, response);
})

routes.get('/api/v1/auth/profile', (request, response) => {
  return authenticatedUserController.handle(request, response)
})