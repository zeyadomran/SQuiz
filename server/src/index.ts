import { mongoose } from "@typegoose/typegoose";
import { ApolloServer } from "apollo-server-express";
import MongoStore from "connect-mongo";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, MONGO_OPTIONS, __prod__ } from "./Constants";
import { QuestionResolver } from "./resolvers/QuestionResolver";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
	// Connecting to MongoDB
	await mongoose
		.connect(process.env.MONGO_URL, MONGO_OPTIONS)
		.then(() => console.log("🚀 DB successfully connected!"));

	// Creating instance of express server
	const app = express();

	app.set("trust proxy", 1);
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		})
	);

	app.use(
		session({
			name: COOKIE_NAME,
			store: MongoStore.create({
				mongoUrl: process.env.MONGO_URL.replace("website", "session"),
				mongoOptions: {
					useNewUrlParser: true,
					useUnifiedTopology: true,
				},
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days.
				httpOnly: true,
				sameSite: "lax", // csrf.
				secure: __prod__, // cookie only works in https.
				domain: __prod__ ? ".zeyadomran.com" : undefined,
			},
			secret: process.env.SESSION_SECRET,
			saveUninitialized: false,
			resave: false,
		})
	);

	// Creating instance of Apollo Server
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [QuestionResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			req,
			res,
		}),
	});

	// Applying app as middleware to Apollo Server
	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	// Start Server
	const port = process.env.PORT;
	app.listen(Number(port), () =>
		console.log(`🚀 Listening on https://localhost:${port}!`)
	);
};

main();
