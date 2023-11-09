import Sidebar from "../home/components/Sidebar";
import UploadModal from "../home/components/modal/UploadModal";
import { EdgeStoreProvider } from '../lib/edgestore';
import getCurrentUser from "../actions/getCurrentUser";
import BottomAppbar from "../home/components/BottomAppbar";

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
                <BottomAppbar />
                <div className="flex">
                  {children}
                </div>
            </EdgeStoreProvider>
        </body>
    )
}