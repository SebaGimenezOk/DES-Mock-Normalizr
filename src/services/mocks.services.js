import { faker } from '@faker-js/faker';


class MockService {
    constructor() {
        this.userMock = [];
    }

    async createBulkUsers(cant = 50) {
        cant = parseInt(cant);
        let maxId = await this.detectedMAxId();
        for (let i = 0; i < cant; i++) {
            this.userMock.push(this.generateUserMock(maxId + (i + 1)))
        }
        return {
            success: true,
            data: this.userMock
        }
    }
    async createReg() {
        const maxId = await this.detectedMAxId();
        const newReg = this.generateUserMock(maxId + 1)
        this.userMock.push(newReg);
        return {
            success: true,
            data: newReg
        }
    }
    async upDateReg(id, updateData) {
        const validation = await this.getReg(id);
        if (!validation.success) {
            return validation;
        }
        const newData = await this.userMock.map(i => {
            if (i.id != id) { return i };
            return { ...i, ...updateData };
        });
        this.userMock = newData;
        return {
            success: true,
            newData: `Usuario/User  ${id} was updated`
        }
    }


    async getAllRegs() {
        return this.userMock;
    }

    async getReg(id) {
        const registerId = await this.userMock.filter(i => i.id == id);
        if (registerId.length > 0) {
            return {
                success: true,
                data: registerId[0]
            }
        }
        return {
            success: false,
            message: 'Register not found'
        }
    }
    async detectedMAxId() {
        let max = 0;
        await this.userMock.forEach(i => {
            if (i.id > max) { max = i.id }
        })
        return max
    }

    generateUserMock(id) {
        return {
            id,
            name: faker.name.firstName(),
            email: faker.internet.email(),
            website: faker.internet.domainName(),
            image: faker.image.image(),
        }
    }


}
export default MockService;
