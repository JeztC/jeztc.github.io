import { render, screen } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import userEvent from '@testing-library/user-event'
import App from "../App";

test('Education component is rendered when "KOULUTUS" button is clicked', async () => {
    const user = userEvent.setup()
    const { getByText } = render(<App/>);
    const educationButton = screen.getByText('KOULUTUS')
    await user.click(educationButton);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor, purus a lobortis semper, dui lectus aliquet dui, non pharetra purus justo vel leo.')).toBeDefined();
});
