import { useAuth } from "../AuthProvider.jsx";
import { ProxyServerExample } from "../components/ProxyServerExample.jsx";

export const Dashboard = () => {
  const { user, handleSignOut } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <p>Signed in as: {user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
      <ProxyServerExample />
    </>
  );
};
