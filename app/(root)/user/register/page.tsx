import UserResgistration from "@/app/components/UserResgistration";

const page = async () => {

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 lg:px-8 flex flex-col-reverse lg:flex-row justify-start items-start gap-5">
            <main className="font-work-sans flex-1">
                <UserResgistration />
            </main>
        </div>
    );
};

export default page;
