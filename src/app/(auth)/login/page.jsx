import { auth } from "@/lib/auth";
import { handleGitLogin } from "@/lib/action";
import styles from "./login.module.css";
import LoginForm from "@/components/login/loginForm";

export default async function Login() {
  const session = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
        <form action={handleGitLogin} className={styles.buttons}>
          <button>Login with Github</button>
          <button>Login with Google</button>
          <button>Login with Facebook</button>
        </form>
      </div>
    </div>
  );
}
