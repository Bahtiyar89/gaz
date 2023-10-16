import {createTheme} from "@mui/material";
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';

export const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#14184c',
    },
    secondary: {
      main: '#0090f5',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      }
    },
  },
  typography: {
    fontFamily: 'PT Sans',
  },
});