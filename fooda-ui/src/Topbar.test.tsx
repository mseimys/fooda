import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render as anonymousRender } from "@testing-library/react";

import { render } from "./testHelpers";
import Topbar from "./Topbar";

test("renders navigation bar for anonymous", () => {
  const { getByText, queryByText } = anonymousRender(
    <MemoryRouter>
      <Topbar />
    </MemoryRouter>
  );
  expect(queryByText(/Restaurants/i)).toBeNull();
  expect(queryByText(/Orders/i)).toBeNull();
  expect(getByText(/Login/i)).toBeInTheDocument();
  expect(getByText(/Signup/i)).toBeInTheDocument();
});

test("renders navigation bar for logged in user", () => {
  const { getByText, queryByText } = render(<Topbar />);
  expect(queryByText(/Restaurants/i)).toBeInTheDocument();
  expect(queryByText(/Orders/i)).toBeInTheDocument();
  expect(getByText(/Hello Jon!/i)).toBeInTheDocument();
  expect(getByText(/Logout/i)).toBeInTheDocument();
  expect(queryByText(/Login/i)).toBeNull();
  expect(queryByText(/Signup/i)).toBeNull();
});
