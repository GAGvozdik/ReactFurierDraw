// theme.ts или theme.js 

import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from '../../src/components/header'
// import MainMap from '../../src/components/map'

// Расширяем тип Components для добавления MainMap
declare module '@mui/material/styles' {
    interface Components {
      MainMap?: {
        styleOverrides?: {
          root?: {
            zIndex?: number;
            position?: string;
            top?: string; // Добавляем свойство top
            paddingTop?: string; // Добавляем свойство top
            // Другие стили для MainMap
          };
        };
      };
      
    }
  }

// Расширяем тип Components для добавления MainMap
declare module '@mui/material/styles' {
    interface Components {
      AppBar?: {
        styleOverrides?: {
          root?: {
            zIndex?: 3,
            position?: 'absolute',
            backgroundColor: '#3D7EBF',
          }
        }
      };

    }
  }


// Создайте тему
// const theme = createTheme({
//   // ... другие настройки темы ...
//     components: {
//         MuiAppBar:{
//             styleOverrides:{
//                 root:{
//                     zIndex: 3,
//                     position: 'absolute',
//                     backgroundColor: '#3D7EBF',

//                 }
//             }
//         },
//         MuiDrawer:{
//             styleOverrides:{
//                 root:{
//                     zIndex: 2,
//                     position: 'absolute',


//                 }
//             }
//         },

//         MainMap: {
//             styleOverrides: {
//               root: {
//                 zIndex: 0,
//                 position: 'absolute',
//                 // Добавьте другие стили для MainMap здесь
//               }
//             }
//           }
//     }
 
// });

// Создайте тему
const theme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            zIndex: 3,
            position: 'absolute',
            backgroundColor: '#3D7EBF',
          }
        }
      },


      MuiDrawer: {
        styleOverrides: {
          root: {
            // zIndex: 2,
            position: 'absolute',
            top: '64px',  // Высота AppBar
          }
        }
      },
  
      MainMap: {
        styleOverrides: {
          root: {
            // zIndex: 1,
            position: 'absolute',
            top: '64px',  // Высота AppBar
            paddingTop: '64px',  // Высота AppBar
          }
        }
      },
      AppBar: {
        styleOverrides: {
          root: {
            // zIndex: 3,
            position: 'absolute',
            backgroundColor: '#3D7EBF',
          }
        }
      },
    }
  });

// Экспортируйте тему
export default theme; 
