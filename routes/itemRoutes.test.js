process.env.NODE_ENV = "test";

const request = require('supertest');

const app = require('../app');
const items = require('../fakeDb');

beforeEach(function() {
    items.push({ name : "pencil", price: 1.99});
    console.log(items)
});

afterEach(function() {
    items.length = 0;
});

describe("GET /items", function() {
    test("Gets all items", async function() {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{"name":"pencil", "price": 1.99}])
    });
});

describe("GET /items/:name", function() {
    test("Gets specific item by name", async function() {
        const resp = await request(app).get(`/items/pencil`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"name":"pencil","price":1.99})
    })
})

describe("POST /items", function() {
    test("Posts item to fakeDb mock database", async function() {
        const resp = await request(app).post('/items').send({"name":"stapler","price":4.99});
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({"added": {"name":"stapler","price":4.99}})
    })
})

describe("PATCH /items/:name", function() {
    test("Updates a current item in fakeDb mock database", async function() {
        const resp = await request(app).patch('/items/pencil').send({"name":"chair","price":25.99});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"updated": {"name":"chair","price":25.99}});
    })
})

describe("DELETE /items/:name", function() {
    test("Deletes a current item in fakeDb mock database", async function() {
        const resp = await request(app).delete(`/items/pencil`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"deleted": {"name":"pencil","price":1.99}});
    })
})