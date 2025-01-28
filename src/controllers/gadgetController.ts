import { Request, Response } from 'express';
import  prisma  from '../config/prisma';
import generateCodename from '../utils/codename';
import { Status } from '@prisma/client';

type Gadget = {
  id: string;
  name: string;
  codename: string;
  status: string;
  decommissionedAt: Date | null;
};

export const getAllGadgets = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const where = status ? { status: status as Status } : {};
    const gadgets = await prisma.gadget.findMany({ where });
    const gadgetsWithProbability = gadgets.map((gadget: Gadget) => ({
      ...gadget,
      missionSuccessProbability: Math.floor(Math.random() * 100)
    }));
    res.json(gadgetsWithProbability);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createGadget = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const codename = await generateCodename(prisma);
    const gadget = await prisma.gadget.create({
      data: { name, codename, status: 'Available' }
    });
    res.status(201).json(gadget);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    if (!name || !status) return res.status(400).json({ error: 'Name and status are required' });
    if (status !== 'Available' && status !== 'Deployed' && status !== 'Destroyed' && status !== 'Decommissioned') return res.status(400).json({ error: 'Invalid status', availableOptions : ['Available', 'Deployed', 'Destroyed', 'Decommissioned'] });
    const gadget = await prisma.gadget.findUnique({ where: { id } });
    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
    if (gadget.status === 'Decommissioned') {
      return res.status(400).json({ error: 'Decommissioned gadgets cannot be updated' });
    }
    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: { name, status }
    });
    res.json(updatedGadget);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const decommissionGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gadget = await prisma.gadget.findUnique({ where: { id } });
    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
    if (gadget.status === 'Decommissioned') {
      return res.status(400).json({ error: 'Gadget already decommissioned' });
    }
    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: { status: 'Decommissioned', decommissionedAt: new Date() }
    });
    res.json(updatedGadget);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const selfDestructGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gadget = await prisma.gadget.findUnique({ where: { id } });
    if (!gadget) return res.status(404).json({ error: 'Gadget not found' });
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    await prisma.gadget.update({
      where: { id },
      data: { status: 'Destroyed' }
    });
    res.json({ confirmationCode, message: 'Self-destruct sequence initiated' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};