import { render } from "@testing-library/react";
import About from "./About";
import { skillsList } from "../data";

test("About component should contain the correct text", () => {
  const { getByText } = render(<About />);

  // eslint-disable-next-line testing-library/prefer-screen-queries

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const randomSkill = getByText(skillsList[0].title);

  expect(randomSkill).toBeDefined();
});