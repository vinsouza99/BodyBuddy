import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Learn } from "./pages/Learn";
import { LearnExercise } from "./pages/LearnExercise";
import { RoutineSession } from "./pages/RoutineSession";
import { NotFound } from "./pages/NotFound";
import { useAuth } from "./utils/AuthProvider";
import { CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { TrainingProgram } from "./pages/TrainingProgram";
import { Landing } from "./pages/Landing";
import { PremadeRoutine } from "./pages/PremadeRoutine";
import CreateProgram from "./pages/CreateProgram";
import AuthenticationOptions from "./pages/AuthenticationOptions";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* No authentication required */}
        <Route index element={<Landing title="BodyBoddy" />} />
        <Route
          path="/enter"
          element={<AuthenticationOptions title="Sign In or Sign Up" />}
        />
        <Route path="/signin" element={<SignIn title="Sign In" />} />
        <Route path="/signup" element={<SignUp title="Sign Up" />} />

        {/* Authentication required (MainLayout is applied) */}
        <Route path="/" element={user ? <MainLayout /> : <Navigate to="/" />}>
          <Route path="/dashboard" element={<Dashboard title="Dashboard" />} />
          <Route path="/profile" element={<Profile title="Profile" />} />
          <Route path="/learning" element={<Learn title="Learn" />} />
          <Route
            path="/learn/:exercise_id"
            element={<LearnExercise title="Learn Exercise" />}
          />
          <Route
            path="/training"
            element={<TrainingProgram title="Training" />}
          />
          <Route
            path="/training/:routine_id"
            element={<PremadeRoutine title="Premade Routine" />}
          />
        </Route>
        <Route path="/create-program" element={<CreateProgram />}></Route>
        <Route path="*" element={<NotFound title="Not found" />} />
        {/* Authentication required (MainLayout is NOT applied) */}
        <Route
          path="/routine"
          element={
            user ? (
              <RoutineSession title="RoutineSession" />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </>
    )
  );

  return (
    // Wrapped with ThemeProvider to apply theme.js styles
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
