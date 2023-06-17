import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Login from "./login";
function App() {
  const { data: session } = useSession();
  const { push } = useRouter();

  if (session) {
    push("/tasks");
  }

  return (
    <div className="App">
      <header className="App-header">{!session && <Login />}</header>
    </div>
  );
}

export default App;
