import Sidebar from "@/app/home/components/Sidebar";
import UploadModal from "@/app/home/components/modal/UploadModal";
import { EdgeStoreProvider } from '@/app//lib/edgestore';
import getCurrentUser from "@/app/actions/getCurrentUser";
import BottomAppbar from "@/app/home/components/BottomAppbar";
import TopAppbar from "@/app/home/components/TopAppbar";

interface AppLayoutProps {
    children: React.ReactNode
}

export default async function AppLayout({
    children
}: AppLayoutProps) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return null
    }
    
    return (
        <body className="bg-black text-white">
            <EdgeStoreProvider>
                <BottomAppbar />
                <TopAppbar />
                <div className="flex">
                    <Sidebar/>
                    <UploadModal currentUser={currentUser}/>
                    <div className="container min-h-screen bg-black text-white">
                        {children}
                    </div>
                </div>
            </EdgeStoreProvider>
        </body>
    )
}