import React from "react";
import { render } from "@testing-library/react";
import Topbar from "./Topbar";

test("renders learn react link", () => {
  const { getByText } = render(<Topbar />);
  const linkElement = getByText(/Fooda/i);
  expect(linkElement).toBeInTheDocument();
});
