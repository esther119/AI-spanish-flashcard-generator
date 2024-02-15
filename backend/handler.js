"use strict";
import app_test from "./index.js";
import serverless from "serverless-http";

export const hello = serverless(app_test);
