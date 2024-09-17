import { fakerES as faker } from "@faker-js/faker";

export const generateProducts = () => {
    return {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 1000, max: 100000 }),
        status: true,
        stock: faker.number.int({ min: 1, max: 200 }),
        category: faker.commerce.department(),
        thumbnails: []
    }
}