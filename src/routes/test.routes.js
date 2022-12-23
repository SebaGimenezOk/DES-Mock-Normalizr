import express from "express";
import MockService from "../services/mocks.services.js";
import lodash from 'lodash';

const mockService = new MockService();

class MockRoutes extends express.Router {


    constructor() {
        super();


        this.post('/popular', async (req, res) => {
            const { cant } = req.query;
            try {
                const response = await mockService.createBulkUsers(cant)
                res.status(200).json(response)

            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    success: true,
                    message: err.message
                })
            }
        })
        this.post('/', async (_req, res) => {
            try {
                const data = await mockService.createReg();
                res.status(200).json(data);
            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    success: true,
                    message: err.message
                })
            }
        })
        this.put('/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { body } = req;
                const dataUpdated = await mockService.upDateReg(id, body);
                if (!dataUpdated.success) {
                    return res.status(400).json(dataUpdated)
                }
                res.status(200).json(dataUpdated);
            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    success: true,
                    message: err.message
                })
            }
        })
        this.get('/:id?', async (req, res) => {
            const { id } = req.params;
            try {
                if (!id) {
                    const responseArray = await mockService.getAllRegs();
                    return res.status(200).json({
                        success: true,
                        data: responseArray
                    })
                }
                const responseUser = await mockService.getReg(id);
                if (!responseUser.success) {
                    return res.status(400).json(responseUser)
                }
                res.status(200).json(responseUser)

            } catch (err) {
                console.error(err);
                return res.status(500).json({
                    success: true,
                    message: err.message
                })
            }
        })
    }
}



export default MockRoutes;