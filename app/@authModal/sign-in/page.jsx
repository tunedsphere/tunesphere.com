import { SignIn } from '@clerk/nextjs';


const SignInPage = () => (
<main>
  <img 
  src='/bggenre/milky-way.jpg'>
  </img>
  <h1>TunedSphere</h1>
  <SignIn
    appearance={{
      elements: {
        formButtonPrimary: ' hover:bg-slate-400 text-sm normal-case'
      }
    }}
    />
    </main>


);


export default SignInPage;

