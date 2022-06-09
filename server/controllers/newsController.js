import { mongoClient } from "../server.js";

export async function getNews(req, res) {
  let query = {};
  const { category, title, author } = req.query;
  if (category) {
    query = { category: category };
  }
  if (title) {
    query = { title: title };
  }
  if (author) {
    query = { author: author };
  }

  const news = await mongoClient
    .db(process.env.MONGODB_DATABASE)
    .collection("news")
    .find(query)
    .sort({ _id: -1 })
    .map(({ title, intro, article, category, author }) => ({
      title,
      intro,
      article,
      category,
      author,
    }))
    .limit(50)
    .toArray();
  return res.json(news);
}

export async function addNewArticle(req, res) {
  const { title, intro, article, category, author } = req.body;
  console.log("hello" + req.body);
  await mongoClient
    .db(process.env.MONGODB_DATABASE)
    .collection("news")
    .insertOne({ title, intro, article, category, author });
  res.sendStatus(200);
}
