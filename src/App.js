import {
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  Box,
} from "@mui/material";
import LexicalEditorWrapper from "./components/LexicalEditorWrapper";
import theme from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item sx={{ my: 4 }}>
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            魔镜魔镜编辑器
          </Typography>
        </Grid>
        <Grid item sx={{ flex: 1, width: "80%", height: "100%", overflow: "hidden"}}>
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <LexicalEditorWrapper />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
