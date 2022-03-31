import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    // ボタンのカラー設定
    primary: {
      main: '#3cb371',
      contrastText: '#ffffff',
    },
    // 背景のカラー設定
    background: {
      default: '#ffffff',
    },

    // テキストのカラー設定
    text: { primary: '#000000' },
  },
});

export default theme;
