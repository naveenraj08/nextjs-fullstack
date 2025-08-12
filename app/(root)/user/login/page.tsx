import { LoginForm } from "./components/LoginForm";

const page = async () => {

    return (
        <div className="mx-auto max-w-7xl px-5 sm:px-6 py-10 lg:px-8">
            <main className="font-work-sans flex-1">
                <LoginForm />
            </main>
        </div>
    );
};

export default page;
