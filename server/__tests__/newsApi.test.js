// import express from "express";
// import { MongoClient } from "mongodb";
// import { NewsApi } from "../api/newsApi";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
//
// dotenv.config();
//
// const app = express();
// app.use(bodyParser.json());
//
// const mongoClient = new MongoClient(process.env.MONGODB_URL);
// beforeAll(async () => {
//     await mongoClient.connect();
//     const database = mongoClient.db("test_database");
//     await database.collection("news").deleteMany({});
//     app.use("/api/news", NewsApi);
// });
// afterAll(() => {
//     mongoClient.close();
// });

describe("movies api", () => {
    it("tests this", () => {

    })
    // it("adds a new movie", async () => {
    //     const title = "My first article";
    //     const intro = "Big exciting intro";
    //     await request(app)
    //         .post("/api/news")
    //         .send({ title, intro })
    //         .expect(200);
    // expect(
    //   (
    //     await request(app).get("/api/movies").query({ country }).expect(200)
    //   ).body.map(({ title }) => title)
    // ).toContain(title);
    // });
});