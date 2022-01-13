import { Router } from "express";
import { CreateDeliverymanController } from "../../../../modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const deliverymanRoutes = Router();

const createClientController = new CreateDeliverymanController();

deliverymanRoutes.post('/', createClientController.handle);

export { deliverymanRoutes }