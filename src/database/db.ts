import { connect } from "chain-db-ts";

const dbServer = process.env.DB_HOST as string;
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;

export const db = connect(dbServer, dbName, dbUser, dbPass);
