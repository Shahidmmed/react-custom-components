import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IUserState } from "../core/interfaces";
import { RootState } from "../core/stores";
import { Dashboard } from "./dashboard/_page";
import { Login } from "./login/_page";
import { PageLayout } from "./_layout/_component";

export const AppRoutes = () => {
  const userStore = useSelector<RootState, IUserState>((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {userStore.user == undefined ? (
          <Route path="*" element={<Login />}></Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route element={<PageLayout />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
