import { Router } from "express";
import { create, deleteCategoryById, getAll, getCategoryById, updateCategoryById } from "../controllers/category";

const categoryRouter = Router();
categoryRouter.post('/category',create);
categoryRouter.get('/category',getAll);
categoryRouter.get('/category/:id',getCategoryById);
categoryRouter.put('/category/:id',updateCategoryById);
categoryRouter.delete('/category/:id',deleteCategoryById);
export default categoryRouter;