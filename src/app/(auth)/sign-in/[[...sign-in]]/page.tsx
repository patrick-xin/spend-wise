import { SignIn } from "@clerk/nextjs";

function SigninPage() {
  return <SignIn path="/sign-in" />;
}

export default SigninPage;
