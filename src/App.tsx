import { MantineProvider, createTheme, localStorageColorSchemeManager } from "@mantine/core";
import "@mantine/core/styles.css";
import Index from "./pages";

const colorSchemeManager = localStorageColorSchemeManager({ key: 'cloud-architect-color-scheme' });

// Create a custom theme for a sleek, modern design
const theme = createTheme({
  primaryColor: 'dark',
  primaryShade: 8,
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
    gray: [
      '#F8F9FA',
      '#F1F3F5',
      '#E9ECEF',
      '#DEE2E6',
      '#CED4DA',
      '#ADB5BD',
      '#868E96',
      '#495057',
      '#343A40',
      '#212529',
    ],
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
      },
    },
    Modal: {
      styles: {
        header: { fontWeight: 600 },
        title: { fontSize: '1.2rem' },
      },
    },
    NavLink: {
      styles: {
        root: { fontWeight: 500 },
      },
    },
    Tabs: {
      styles: {
        tab: { fontWeight: 500 },
      },
    },
  },
});

function App() {
  return (
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager} defaultColorScheme="light">
      <Index></Index>
    </MantineProvider>
  );
}

export default App;
