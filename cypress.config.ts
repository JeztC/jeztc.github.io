import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-test-output.xml',
    toConsole: true,
  },
});
