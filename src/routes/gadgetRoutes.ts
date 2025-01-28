import express from 'express';
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const {
  getAllGadgets,
  createGadget,
  updateGadget,
  decommissionGadget,
  selfDestructGadget,
} = require('../controllers/gadgetController');

router.get('/', getAllGadgets);
router.post('/', authenticate, createGadget);
router.patch('/:id', authenticate, updateGadget);
router.delete('/:id', authenticate, decommissionGadget);
router.post('/:id/self-destruct', authenticate, selfDestructGadget);

export default router;