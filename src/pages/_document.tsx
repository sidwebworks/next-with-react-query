import { createGetInitialProps } from "@mantine/next";
import Document from "next/document";

/** Setup for Emotion CSS in JS lib, Mantine uses it */

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;
}
