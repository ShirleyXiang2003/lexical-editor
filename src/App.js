import {
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  Box,
} from "@mui/material";
import LexicalEditorWrapper from "./components/LexicalEditorWrapper";
import Upload from "./components/Test/Upload";
import theme from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={5} sx={{ my: 4, pl: 2 }}>
          {/* Left side: Upload component */}
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            魔镜魔镜编辑器
          </Typography>
          <Upload />
        </Grid>
        <Grid item xs={7} sx={{ my: 4, pr: 2 }}>
          {/* Right side: Editor wrapper */}
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <LexicalEditorWrapper />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
