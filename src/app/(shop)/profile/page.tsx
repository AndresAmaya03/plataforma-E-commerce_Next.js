import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function NamePage() {
    const session = await auth()

    if (!session?.user) {
        // redirect('/auth/login?returnTo=/profile')
        redirect('/')
    }

    return (
        <div>
            <Title
                title="Profile"
            />
            <pre>
                {
                    JSON.stringify(session.user, null, 2)
                }
            </pre>
            <h1 className="text-5xl">{session.user.id}</h1>
        </div>
    );
}