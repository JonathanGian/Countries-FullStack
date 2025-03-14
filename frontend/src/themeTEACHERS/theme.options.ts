// import { createTheme, type ThemeOptions } from '@mui/material/styles';

// const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//           // Light mode colors
//           primary: {
//             main: 'hsl(240 5.9% 10%)',
//             contrastText: 'hsl(0 0% 98%)',
//           },
//           secondary: {
//             main: 'hsl(240 4.8% 95.9%)',
//             contrastText: 'hsl(240 5.9% 10%)',
//           },
//           background: {
//             default: 'hsl(0 0% 100%)',
//             paper: 'hsl(0 0% 100%)',
//           },
//           text: {
//             primary: 'hsl(240 10% 3.9%)',
//             secondary: 'hsl(240 3.8% 46.1%)',
//           },
//           error: {
//             main: 'hsl(0 72.22% 50.59%)',
//             contrastText: 'hsl(0 0% 98%)',
//           },
//           divider: 'hsl(240 5.9% 90%)',
//         }
//       : {
//           // Dark mode colors
//           primary: {
//             main: 'hsl(0 0% 98%)',
//             contrastText: 'hsl(240 5.9% 10%)',
//           },
//           secondary: {
//             main: 'hsl(240 3.7% 15.9%)',
//             contrastText: 'hsl(0 0% 98%)',
//           },
//           background: {
//             default: 'hsl(240 10% 3.9%)',
//             paper: 'hsl(240 10% 3.9%)',
//           },
//           text: {
//             primary: 'hsl(0 0% 98%)',
//             secondary: 'hsl(240 5% 64.9%)',
//           },
//           error: {
//             main: 'hsl(0 62.8% 30.6%)',
//             contrastText: 'hsl(0 85.7% 97.3%)',
//           },
//           divider: 'hsl(240 3.7% 15.9%)',
//         }),
//   },
//   typography: {
//     fontFamily: '"Poppins", sans-serif',
//     h1: {
//       fontWeight: 600,
//     },
//     h2: {
//       fontWeight: 600,
//     },
//     h3: {
//       fontWeight: 500,
//     },
//     h4: {
//       fontWeight: 500,
//     },
//     h5: {
//       fontWeight: 500,
//     },
//     h6: {
//       fontWeight: 500,
//     },
//   },
//   shape: {
//     borderRadius: 8, // Based on your --radius variable
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           borderRadius: 8,
//           fontWeight: 500,
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           background: 'transparent',
//           boxShadow: 'none',
//           backdropFilter: 'blur(12px)',
//         },
//       },
//     },
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           scrollBehavior: 'smooth',
//         },
//       },
//     },
//   },
// });

// export const createAppTheme = (mode: 'light' | 'dark') => {
//   return createTheme(getThemeOptions(mode));
// };