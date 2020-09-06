import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { RootContext } from "./context";

const Wrapper = ({ children }: any) => {
  return (
    <RootContext.Provider
      value={{
        setUser: jest.fn(),
        clearUser: jest.fn(),
        user: {
          id: 123,
          first_name: "Jon",
          token: "secret",
          anonymous: false,
        },
      }}
    >
      <MemoryRouter>{children}</MemoryRouter>
    </RootContext.Provider>
  );
};

const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };
