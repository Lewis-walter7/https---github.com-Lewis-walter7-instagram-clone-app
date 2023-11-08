import Sidebar from "./components/Sidebar"
import UploadModal from "./components/modal/UploadModal"
import { EdgeStoreProvider } from '../lib/edgestore';
import getCurrentUser from "../actions/getCurrentUser";

interface AppLayoutProps {
    children: React.ReactNode
}

export default async function AppLayout({
    children
}: AppLayoutProps) {
    const currentUser = await getCurrentUser()
    return (
        <body className="bg-black text-white">
            <EdgeStoreProvider>
                <div className="flex">
                    <Sidebar />
                    <UploadModal currentUser={currentUser}/>
                    <div className="container min-h-screen bg-black text-white">
                        {children}
                    </div>
                </div>
            </EdgeStoreProvider>
        </body>
    )
}