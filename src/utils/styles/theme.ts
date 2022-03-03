import { createTheme } from '@material-ui/core';
import globalColors from './globalColors';

const RobotoBlack = {
    fontFamily: 'Roboto',
    src: `../../assets/fonts/Roboto-Medium.ttf`,
    fontWeight: '500',
  };

export default createTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          'html, body, #root': {
            height: '100%',
            margin: 0,
            padding: 0,
          },
          '@font-face': [RobotoBlack],
        },
      },
    },
    palette: {
      background: {
        default: globalColors.lightBlueBackground
      },
      primary: {
        main: globalColors.lightBlue,
      },
      secondary: {
        main: globalColors.white
      }
    },
});