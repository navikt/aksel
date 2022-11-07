/* eslint-disable no-undef */
// jest.setup.js
import { setConfig } from "next/config";
import config from "./next.config";
import "@testing-library/jest-dom/extend-expect";
import { ArrayBuffer, TextDecoder, TextEncoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ArrayBuffer = ArrayBuffer;
/* global.Uint8Array = Uint8Array; */
// Make sure you can use "publicRuntimeConfig" within tests.
setConfig(config);
